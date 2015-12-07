(function (jQuery) {
    $.fn.hexStudyExercise = function () {
        $(this).each(function () {
            var eKey = $(this).attr("exerciseKey");
            var exerciseBuilder = new HexStudyExercise.ExerciseBuilder();
            exerciseBuilder.build(+eKey);
        });
    }
})(jQuery);

$(function () {
    $(".hexStudy_exercise").hexStudyExercise();
});