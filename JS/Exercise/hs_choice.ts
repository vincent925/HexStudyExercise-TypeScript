///<reference path="hs_exercise.ts" />

namespace HexStudyExercise {
	export class Choice extends HexStudyExercise.Exercise {
        constructor(exercise: string) {
            super(exercise);
        }
        fixView() {
            super.fixView();
            var option: string = $("[exerciseKey='" + this.eid + "']").first().find(".option").first().html();
            option = this.InitOption(option);
            $("[exerciseKey='" + this.eid + "']").first().find(".option").first().html(option);
        }
        //初始化选项
        private InitOption(option: string): string {
            for (var i = 0; i < this.exerciseData.AnswersOptions.length; i++) {
                var newOption: string = "";
                if (!this.exerciseData.IsSingleChoice) {
                    newOption = "<input type=\"checkbox\" key=\"" + i + "\">";
                    var re = new RegExp("<input type=\"radio\" key=\"" + i + "\"(.*?)>");
                    option = option.replace(re, newOption);
                }
            }
            return option;
        }
    }
}