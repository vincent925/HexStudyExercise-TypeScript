/**
 * Created by zhangcheng on 15/11/15.
 */
///<reference path="Support/jquery.d.ts" />
///<reference path="Support/handlebars.d.ts" />
//编译命令：  tsc --outFile ../HexStudyExercise.js hs_exercise.ts hs_choice.ts hs_subjective.ts hs_fillBlank.ts hs_compute.ts hs_judgment.ts hs_program.ts hs_choiceFillBlank.ts

var exerciseConfig:any;

namespace HexStudyExercise {
    
    export class ExerciseBuilder {
        constructor() {
        }
        build(eid: number) {
            this.getExerciseById(eid);
        }
        buildExercise(exerciseData: any) {
            var exer = ExerciseFactory.getInstance(exerciseData.ET);
            exer.eid = exerciseData.ExerciseId;
            exer.exerciseData = exerciseData;
            //2、用handlebars将json匹配模板解析题视图（view）
            exer.buildDataToView();
            //3、如果有则调用第三方的调整代码
            exer.fixView();
            //4、如果有则调用答案比对代码
            exer.compareAnswer();
            //5、记录做题时间
            exer.timer();
        }
        getExerciseById(eid: number) {
            var exer = this;
            $.ajax({
                type: "get",
                dataType: "json",
                url: "http://webapi.ld.hexstudy.com/api/Exercises/",
                data: "id=" + eid + "&ssotoken=Jiyuan",
                success: function(data) {
                    exer.buildExercise(data);
                }
            });
        }

    }

    export class Exercise {
        eid: string;
        exerciseTemplate: any;
        exerciseData: any;

        constructor(exercise: string) {
            this.exerciseTemplate = exerciseConfig[exercise];
        }

        buildDataToView() {
            var template = Handlebars.compile(this.exerciseTemplate);
            var html = template(this.exerciseData);
            $("[exerciseKey='" + this.eid + "']").first().html(html);
            $("[exerciseKey='" + this.eid + "'] .tip a").bind("click", function(obj) {
                alert(this.eid);
            });
        }

        fixView() {
            this.InitSequence();
        }

        compareAnswer() { }

        timer() { }
        //初始化序号
        private InitSequence() {
            var s: any = $("[exerciseKey='" + this.eid + "']").attr("sequence");
            if (s != undefined) {
                var sq: number = (+s) + 1;
                $("[exerciseKey='" + this.eid + "']").find(".sequence").text(sq + ".");
            }
        }
        private InitTips() {
            //初始化提示
        }
    }

    export class ExerciseFactory {
        public static getInstance(prefix: string): Exercise {
            var exercise: Exercise;
            switch (prefix) {
                case 'Choice': {
                    exercise = new HexStudyExercise.Choice(prefix);
                    break;
                }
                case 'Subjective': {
                    exercise = new HexStudyExercise.Subjective(prefix);
                    break;
                }
                case 'FillBlank': {
                    exercise = new HexStudyExercise.FillBlank(prefix);
                    break;
                }
                case 'Judgment': {
                    exercise = new HexStudyExercise.Judgment(prefix);
                    break;
                }
                case 'Program': {
                    exercise = new HexStudyExercise.Program(prefix);
                    break;
                }
                case 'ChoiceFillBlank': {
                    exercise = new HexStudyExercise.ChoiceFillBlank(prefix);
                    break;
                }
                case 'Compute': {
                    exercise = new HexStudyExercise.Compute(prefix);
                    break;
                }
                default: {
                    alert("Wrong Model.........");
                }
            }
            return exercise;
        }
    }
}