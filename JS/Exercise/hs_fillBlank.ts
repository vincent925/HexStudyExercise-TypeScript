///<reference path="hs_exercise.ts" />

namespace HexStudyExercise {
	export class FillBlank extends HexStudyExercise.Exercise {
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
            for (var i = 0; i < this.exerciseData.FillBlankAnswers.length; i++) {
                var blank: string = "";
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