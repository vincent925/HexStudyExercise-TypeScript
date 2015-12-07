///<reference path="hs_exercise.ts" />

namespace HexStudyExercise {
	export class Compute extends HexStudyExercise.Exercise {
        constructor(exercise: string) {
            super(exercise);
            //super.exerciseTemplate=$(exerciseConfig[exercise]);
        }
        buildDataToView() {
            //super.eid = this.eid;
            //super.exerciseData = this.exerciseData;
            super.buildDataToView();
            $("[exerciseKey='" + this.eid + "']").find(".hexStudy_Questions").hexStudyExercise();
        }
        fixView() {
            super.fixView();
        }
    }
}