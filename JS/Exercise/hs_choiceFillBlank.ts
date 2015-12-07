///<reference path="hs_exercise.ts" />

namespace HexStudyExercise {
	export class ChoiceFillBlank extends HexStudyExercise.Exercise {
        constructor(exercise: string) {
            super(exercise);
        }
        fixView() {
            super.fixView();
            var subject: string = $("[exerciseKey='" + this.eid + "']").first().find(".topic").first().html();
            subject = this.SubjectEx(subject);
            $("[exerciseKey='" + this.eid + "']").first().find(".topic").first().html(subject);
        }
        //初始化题干
        private SubjectEx(subject: string): string {
            for (var i = 0; i < this.exerciseData.ChoiceFillBlankAnswers.length; i++) {
                var blank: string = "";
                var content: string = "";
                for (var j = 0; j < this.exerciseData.ChoiceFillBlankAnswers[i].ChoiceFillBlankAnswerOptions.length; j++) {
                    content = content + this.exerciseData.ChoiceFillBlankAnswers[i].ChoiceFillBlankAnswerOptions[j].Content + "|";
                }
                content = content.substring(0, content.length - 1);
                blank = "<span class=\"u_span\" answer=\"" + content + "\"></span>";
                var num: number = i + 1;
                var re = new RegExp("<span blankindex=\"" + num + "\"(.*?)>__(\\d+)__<\/span>");
                var re2 = new RegExp("<span class=\"blankTB_" + num + "\">__(\\d+)__<\/span>");
                subject = subject.replace(re, blank);
                subject = subject.replace(re2, blank);
            }
            return subject;
        }
    }
}