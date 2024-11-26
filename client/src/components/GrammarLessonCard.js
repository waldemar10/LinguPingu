import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const GrammarLessonCard = ({
  lesson,
  lessonIndex,
  appLanguage,
  openGrammarCard,
  completedLessons,
}) => {
  return (
    <div key={lesson.level} className="rounded p-1">
      <div
        key={lesson.level + `${lessonIndex + "G-Div"}`}
        className="d-flex flex-column align-items-center justify-content-center">
        {lesson.lessons.map((grammar, grammarIndex) => {
          const title = grammar["title_" + appLanguage];
          const subtitle = grammar["subtitle_" + appLanguage];
          const isCompleted = completedLessons.includes(grammar.title_en);
          return (
            <button
              key={title + `${grammarIndex + "G-Button"}`}
              className={`d-flex justify-content-center align-items-center btn  bg-g-button m-2 w-100 position-relative
              ${isCompleted ? "btn-completed" : "btn-hover"}
              `}
              style={{ minHeight: "125px" }}
              onClick={() => {
                openGrammarCard(lessonIndex, grammarIndex, title);
              }}>
              <img
                src={process.env.PUBLIC_URL + grammar.img}
                className="g-img m-2 rounded-circle"
                alt={title}
              />

              <div className="w-100 p-2 text-start text-light ">
                <div className="row justify-content-between align-items-center">
                  <h4 className="col">{title}</h4>

                  {isCompleted && (
                    <div className="completed col  g-completed-box">
                      <FontAwesomeIcon icon={faCircleCheck} size="2x" />
                    </div>
                  )}
                </div>
                <p>
                  <small>{subtitle} </small>
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default GrammarLessonCard;
