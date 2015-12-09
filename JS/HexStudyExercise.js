/**
 * Created by zhangcheng on 15/11/15.
 */
///<reference path="Support/jquery.d.ts" />
///<reference path="Support/handlebars.d.ts" />
//编译命令：  tsc --outFile ../HexStudyExercise.js hs_exercise.ts hs_choice.ts hs_subjective.ts hs_fillBlank.ts hs_compute.ts hs_judgment.ts hs_program.ts hs_choiceFillBlank.ts
var exerciseConfig;
var HexStudyExercise;
(function (HexStudyExercise) {
    var ExerciseBuilder = (function () {
        function ExerciseBuilder() {
        }
        ExerciseBuilder.prototype.build = function (eid) {
            this.getExerciseById(eid);
        };
        ExerciseBuilder.prototype.buildExercise = function (exerciseData) {
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
        };
        ExerciseBuilder.prototype.getExerciseById = function (eid) {
            var exer = this;
            $.ajax({
                type: "get",
                dataType: "json",
                url: "http://webapi.ld.hexstudy.com/api/Exercises/",
                data: "id=" + eid + "&ssotoken=Jiyuan",
                success: function (data) {
                    exer.buildExercise(data);
                }
            });
        };
        return ExerciseBuilder;
    })();
    HexStudyExercise.ExerciseBuilder = ExerciseBuilder;
    var Exercise = (function () {
        function Exercise(exercise) {
            this.exerciseTemplate = exerciseConfig[exercise];
        }
        Exercise.prototype.buildDataToView = function () {
            var template = Handlebars.compile(this.exerciseTemplate);
            var html = template(this.exerciseData);
            $("[exerciseKey='" + this.eid + "']").first().html(html);
            // $("[exerciseKey='" + this.eid + "'] .tip a").bind("click", function(obj) {
            //     alert(this.eid);
            // });
        };
        Exercise.prototype.fixView = function () {
            this.InitSequence();
            this.InitTips();
        };
        Exercise.prototype.compareAnswer = function () { };
        Exercise.prototype.timer = function () { };
        //初始化序号
        Exercise.prototype.InitSequence = function () {
            var s = $("[exerciseKey='" + this.eid + "']").attr("sequence");
            if (s != undefined) {
                var sq = (+s) + 1;
                $("[exerciseKey='" + this.eid + "']").find(".sequence").text(sq + ".");
            }
        };
        //初始化提示
        Exercise.prototype.InitTips = function () {
            var exer = this;
            $("[exerciseKey='" + this.eid + "']").find(".tip a").first().click(function () {
                //alert(exer.eid);
                $("[exerciseKey='" + exer.eid + "']").find(".tip-info [style='display:none;']").first().show();
            });
        };
        return Exercise;
    })();
    HexStudyExercise.Exercise = Exercise;
    var ExerciseFactory = (function () {
        function ExerciseFactory() {
        }
        ExerciseFactory.getInstance = function (prefix) {
            var exercise;
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
        };
        return ExerciseFactory;
    })();
    HexStudyExercise.ExerciseFactory = ExerciseFactory;
})(HexStudyExercise || (HexStudyExercise = {}));
///<reference path="hs_exercise.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HexStudyExercise;
(function (HexStudyExercise) {
    var Choice = (function (_super) {
        __extends(Choice, _super);
        function Choice(exercise) {
            _super.call(this, exercise);
        }
        Choice.prototype.fixView = function () {
            _super.prototype.fixView.call(this);
            var option = $("[exerciseKey='" + this.eid + "']").first().find(".option").first().html();
            option = this.InitOption(option);
            $("[exerciseKey='" + this.eid + "']").first().find(".option").first().html(option);
        };
        //初始化选项
        Choice.prototype.InitOption = function (option) {
            for (var i = 0; i < this.exerciseData.AnswersOptions.length; i++) {
                var newOption = "";
                if (!this.exerciseData.IsSingleChoice) {
                    newOption = "<input type=\"checkbox\" key=\"" + i + "\">";
                    var re = new RegExp("<input type=\"radio\" key=\"" + i + "\"(.*?)>");
                    option = option.replace(re, newOption);
                }
            }
            return option;
        };
        return Choice;
    })(HexStudyExercise.Exercise);
    HexStudyExercise.Choice = Choice;
})(HexStudyExercise || (HexStudyExercise = {}));
///<reference path="hs_exercise.ts" />
var HexStudyExercise;
(function (HexStudyExercise) {
    var Subjective = (function (_super) {
        __extends(Subjective, _super);
        function Subjective(exercise) {
            _super.call(this, exercise);
        }
        Subjective.prototype.fixView = function () {
            _super.prototype.fixView.call(this);
        };
        return Subjective;
    })(HexStudyExercise.Exercise);
    HexStudyExercise.Subjective = Subjective;
})(HexStudyExercise || (HexStudyExercise = {}));
///<reference path="hs_exercise.ts" />
var HexStudyExercise;
(function (HexStudyExercise) {
    var FillBlank = (function (_super) {
        __extends(FillBlank, _super);
        function FillBlank(exercise) {
            _super.call(this, exercise);
        }
        FillBlank.prototype.fixView = function () {
            _super.prototype.fixView.call(this);
            var subject = $("[exerciseKey='" + this.eid + "']").first().find(".topic").first().html();
            subject = this.SubjectEx(subject);
            $("[exerciseKey='" + this.eid + "']").first().find(".topic").first().html(subject);
        };
        //初始化题干
        FillBlank.prototype.SubjectEx = function (subject) {
            for (var i = 0; i < this.exerciseData.FillBlankAnswers.length; i++) {
                var blank = "";
                if (this.exerciseData.FillBlankAnswers[i].IsFormula) {
                    for (var j = 0; j < this.exerciseData.FillBlankAnswers[i].ReqStudentAnswerCount; j++) {
                        blank = blank + "<input type='text' name='Answer' value='' class='editor'>";
                    }
                }
                else {
                    for (var j = 0; j < this.exerciseData.FillBlankAnswers[i].ReqStudentAnswerCount; j++) {
                        blank = blank + "<input type='text' name='Answer' value=''>";
                    }
                }
                var num = i + 1;
                var re = new RegExp("<span blankindex=\"" + num + "\"(.*?)>__(\\d+)__<\/span>");
                var re2 = new RegExp("<span class=\"blankTB_" + num + "\">__(\\d+)__<\/span>");
                subject = subject.replace(re, blank);
                subject = subject.replace(re2, blank);
            }
            return subject;
        };
        return FillBlank;
    })(HexStudyExercise.Exercise);
    HexStudyExercise.FillBlank = FillBlank;
})(HexStudyExercise || (HexStudyExercise = {}));
///<reference path="hs_exercise.ts" />
var HexStudyExercise;
(function (HexStudyExercise) {
    var Compute = (function (_super) {
        __extends(Compute, _super);
        function Compute(exercise) {
            _super.call(this, exercise);
            //super.exerciseTemplate=$(exerciseConfig[exercise]);
        }
        Compute.prototype.buildDataToView = function () {
            //super.eid = this.eid;
            //super.exerciseData = this.exerciseData;
            _super.prototype.buildDataToView.call(this);
            $("[exerciseKey='" + this.eid + "']").find(".hexStudy_Questions").hexStudyExercise();
        };
        Compute.prototype.fixView = function () {
            _super.prototype.fixView.call(this);
        };
        return Compute;
    })(HexStudyExercise.Exercise);
    HexStudyExercise.Compute = Compute;
})(HexStudyExercise || (HexStudyExercise = {}));
///<reference path="hs_exercise.ts" />
var HexStudyExercise;
(function (HexStudyExercise) {
    var Judgment = (function (_super) {
        __extends(Judgment, _super);
        function Judgment(exercise) {
            _super.call(this, exercise);
        }
        Judgment.prototype.fixView = function () {
            _super.prototype.fixView.call(this);
        };
        return Judgment;
    })(HexStudyExercise.Exercise);
    HexStudyExercise.Judgment = Judgment;
})(HexStudyExercise || (HexStudyExercise = {}));
///<reference path="hs_exercise.ts" />
var HexStudyExercise;
(function (HexStudyExercise) {
    var Program = (function (_super) {
        __extends(Program, _super);
        function Program(exercise) {
            _super.call(this, exercise);
        }
        Program.prototype.fixView = function () {
            _super.prototype.fixView.call(this);
        };
        return Program;
    })(HexStudyExercise.Exercise);
    HexStudyExercise.Program = Program;
})(HexStudyExercise || (HexStudyExercise = {}));
///<reference path="hs_exercise.ts" />
var HexStudyExercise;
(function (HexStudyExercise) {
    var ChoiceFillBlank = (function (_super) {
        __extends(ChoiceFillBlank, _super);
        function ChoiceFillBlank(exercise) {
            _super.call(this, exercise);
        }
        ChoiceFillBlank.prototype.fixView = function () {
            _super.prototype.fixView.call(this);
            var subject = $("[exerciseKey='" + this.eid + "']").first().find(".topic").first().html();
            subject = this.SubjectEx(subject);
            $("[exerciseKey='" + this.eid + "']").first().find(".topic").first().html(subject);
        };
        //初始化题干
        ChoiceFillBlank.prototype.SubjectEx = function (subject) {
            for (var i = 0; i < this.exerciseData.ChoiceFillBlankAnswers.length; i++) {
                var blank = "";
                var content = "";
                for (var j = 0; j < this.exerciseData.ChoiceFillBlankAnswers[i].ChoiceFillBlankAnswerOptions.length; j++) {
                    content = content + this.exerciseData.ChoiceFillBlankAnswers[i].ChoiceFillBlankAnswerOptions[j].Content + "|";
                }
                content = content.substring(0, content.length - 1);
                blank = "<span class=\"u_span\" answer=\"" + content + "\"></span>";
                var num = i + 1;
                var re = new RegExp("<span blankindex=\"" + num + "\"(.*?)>__(\\d+)__<\/span>");
                var re2 = new RegExp("<span class=\"blankTB_" + num + "\">__(\\d+)__<\/span>");
                subject = subject.replace(re, blank);
                subject = subject.replace(re2, blank);
            }
            return subject;
        };
        return ChoiceFillBlank;
    })(HexStudyExercise.Exercise);
    HexStudyExercise.ChoiceFillBlank = ChoiceFillBlank;
})(HexStudyExercise || (HexStudyExercise = {}));
