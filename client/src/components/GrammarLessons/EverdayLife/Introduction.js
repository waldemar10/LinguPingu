import React from 'react';

const Introduction = ({ nativeLanguage, targetLanguage, isLesson }) => {
    if (!isLesson) {
        return null;
    }
    const getLesson = () => {

        if (nativeLanguage === 'de') {
            switch (targetLanguage) {
                case 'en':
                    return (
                        <>
                            <div className=''>



                                <p>Die Fähigkeit, sich auf Englisch vorzustellen, ist entscheidend, wenn man in englischsprachigen Umgebungen kommuniziert.</p>
                                <p>Bei der Vorstellung sagst du der anderen Person zunächst deinen Namen.</p>
                                <img
                                    className='g-lesson-img float-end m-3 rounded'
                                    src="/images/Grammar/introduction.jpg"
                                    alt="introduction"
                                />
                                <ul>

                                    <li><b>My name is Anna. </b> (Mein Name ist Anna.)</li>

                                </ul>

                                <p>Wenn du dich mit deinem Namen vorgestellt hast, werden häufig im Gespräch
                                    die folgenden Fragen gestellt. Einige Antwortmöglichkeiten kannst du
                                    hier auch direkt nachlesen:</p>
                                <ul>


                                    <li><b>Where are you from?</b> (Woher kommst du?)</li>

                                    <p> Antwort: <b>"I am from Germany."</b> (Ich komme aus Deutschland.)</p>


                                    <li><b>How old are you?</b> (Wie alt bist du?) </li>

                                    <p>Antwort: <b>"I’m fourteen years old."</b> (Ich bin vierzehn Jahre alt.)</p>

                                    <li><b>Do you have any brothers or sisters?</b>(Hast du Brüder oder Schwestern?) </li>

                                    <p>Antwort: <b>"I have one brother and one sister."</b> (Ich habe einen Bruder und eine Schwester.) </p>

                                    <li><b>What are your hobbies?</b> (Was sind deine Hobbys?) </li>

                                    <p>Antwort: <b>"My hobbies are playing football and reading."</b> (Meine Hobbys sind Fußball spielen und lesen.) </p>
                                </ul>

                                <p>Denke daran, während der Vorstellung höflich zu lächeln und Augenkontakt zu halten, um Selbstsicherheit und Freundlichkeit zu zeigen. Mit diesen Schritten kannst du dich erfolgreich auf Englisch vorstellen und einen guten ersten Eindruck hinterlassen.</p>


                                <div className='alert alert-info'>
                                    Tipp: Übe, indem du dich selbst auf Englisch vorstellst. Du kannst auch mit Freunden oder Familienmitgliedern üben, um dich auf Englisch vorzustellen.


                                </div>
                            </div>

                        </>
                    );
                default:
                    return (
                        <>
                            <div className=''>



                                <p>Die Fähigkeit, sich auf Englisch vorzustellen, ist entscheidend, wenn man in englischsprachigen Umgebungen kommuniziert.</p>
                                <p>Bei der Vorstellung sagst du der anderen Person zunächst deinen Namen.</p>
                                <img
                                    className='g-lesson-img float-end m-3 rounded'
                                    src="/images/Grammar/introduction.jpg"
                                    alt="introduction"
                                />
                                <ul>

                                    <li><b>My name is Anna. </b> (Mein Name ist Anna.)</li>

                                </ul>

                                <p>Wenn du dich mit deinem Namen vorgestellt hast, werden häufig im Gespräch
                                    die folgenden Fragen gestellt. Einige Antwortmöglichkeiten kannst du
                                    hier auch direkt nachlesen:</p>
                                <ul>


                                    <li><b>Where are you from?</b> (Woher kommst du?)</li>

                                    <p> Antwort: <b>"I am from Germany."</b> (Ich komme aus Deutschland.)</p>


                                    <li><b>How old are you?</b> (Wie alt bist du?) </li>

                                    <p>Antwort: <b>"I’m fourteen years old."</b> (Ich bin vierzehn Jahre alt.)</p>

                                    <li><b>Do you have any brothers or sisters?</b>(Hast du Brüder oder Schwestern?) </li>

                                    <p>Antwort: <b>"I have one brother and one sister."</b> (Ich habe einen Bruder und eine Schwester.) </p>

                                    <li><b>What are your hobbies?</b> (Was sind deine Hobbys?) </li>

                                    <p>Antwort: <b>"My hobbies are playing football and reading."</b> (Meine Hobbys sind Fußball spielen und lesen.) </p>
                                </ul>

                                <p>Denke daran, während der Vorstellung höflich zu lächeln und Augenkontakt zu halten, um Selbstsicherheit und Freundlichkeit zu zeigen. Mit diesen Schritten kannst du dich erfolgreich auf Englisch vorstellen und einen guten ersten Eindruck hinterlassen.</p>


                                <div className='alert alert-info'>
                                    Tipp: Übe, indem du dich selbst auf Englisch vorstellst. Du kannst auch mit Freunden oder Familienmitgliedern üben, um dich auf Englisch vorzustellen.


                                </div>
                            </div>

                        </>
                    );
            }
        }

        if (nativeLanguage === 'en') {
            switch (targetLanguage) {
                case 'de':
                    return (
                        <>
                            <div className=''>
                                <p>The ability to introduce yourself in German is crucial when communicating in German-speaking environments.</p>
                                <p>During the introduction, you first tell the other person your name.</p>
                                <img
                                    className='g-lesson-img float-end m-3 rounded'
                                    src="/images/Grammar/introduction.jpg"
                                    alt="introduction"
                                />
                                <ul>
                                    <li><b>Mein Name ist Anna. </b> (My name is Anna.)</li>
                                </ul>

                                <p>Once you've introduced yourself with your name, the following questions are often asked in conversation. You can also read some possible answers here:</p>
                                <ul>
                                    <li><b>Woher kommst du?</b> (Where are you from?)</li>
                                    <p>Answer: <b>"Ich komme aus Deutschland."</b> (I am from Germany.)</p>

                                    <li><b>Wie alt bist du?</b> (How old are you?) </li>
                                    <p>Answer: <b>"Ich bin vierzehn Jahre alt."</b> (I am fourteen years old.)</p>

                                    <li><b>Hast du Brüder oder Schwestern?</b>(Do you have any brothers or sisters?) </li>
                                    <p>Answer: <b>"Ich habe einen Bruder und eine Schwester."</b> (I have one brother and one sister.) </p>

                                    <li><b>Was sind deine Hobbys?</b> (What are your hobbies?) </li>
                                    <p>Answer: <b>"My hobbies are playing football and reading."</b> (Meine Hobbys sind Fußball spielen und lesen.) </p>
                                </ul>

                                <p>Remember to smile politely and maintain eye contact during the introduction to show confidence and friendliness. With these steps, you can successfully introduce yourself in German and leave a good first impression.</p>

                                <div className='alert alert-info'>
                                    Tip: Practice by introducing yourself in German. You can also practice with friends or family members to introduce yourself in German.
                                </div>
                            </div>

                        </>
                    );
                default:
                    return (
                        <>
                            <div className=''>
                                <p>The ability to introduce yourself in German is crucial when communicating in German-speaking environments.</p>
                                <p>During the introduction, you first tell the other person your name.</p>
                                <img
                                    className='g-lesson-img float-end m-3 rounded'
                                    src="/images/Grammar/introduction.jpg"
                                    alt="introduction"
                                />
                                <ul>
                                    <li><b>Mein Name ist Anna. </b> (My name is Anna.)</li>
                                </ul>

                                <p>Once you've introduced yourself with your name, the following questions are often asked in conversation. You can also read some possible answers here:</p>
                                <ul>
                                    <li><b>Woher kommst du?</b> (Where are you from?)</li>
                                    <p>Answer: <b>"Ich komme aus Deutschland."</b> (I am from Germany.)</p>

                                    <li><b>Wie alt bist du?</b> (How old are you?) </li>
                                    <p>Answer: <b>"Ich bin vierzehn Jahre alt."</b> (I am fourteen years old.)</p>

                                    <li><b>Hast du Brüder oder Schwestern?</b>(Do you have any brothers or sisters?) </li>
                                    <p>Answer: <b>"Ich habe einen Bruder und eine Schwester."</b> (I have one brother and one sister.) </p>

                                    <li><b>Was sind deine Hobbys?</b> (What are your hobbies?) </li>
                                    <p>Answer: <b>"My hobbies are playing football and reading."</b> (Meine Hobbys sind Fußball spielen und lesen.) </p>
                                </ul>

                                <p>Remember to smile politely and maintain eye contact during the introduction to show confidence and friendliness. With these steps, you can successfully introduce yourself in German and leave a good first impression.</p>

                                <div className='alert alert-info'>
                                    Tip: Practice by introducing yourself in German. You can also practice with friends or family members to introduce yourself in German.
                                </div>
                            </div>

                        </>
                    );
            }
        }else{
            return (
                <>
                    <div className=''>
                        <p>The ability to introduce yourself in German is crucial when communicating in German-speaking environments.</p>
                        <p>During the introduction, you first tell the other person your name.</p>
                        <img
                            className='g-lesson-img float-end m-3 rounded'
                            src="/images/Grammar/introduction.jpg"
                            alt="introduction"
                        />
                        <ul>
                            <li><b>Mein Name ist Anna. </b> (My name is Anna.)</li>
                        </ul>

                        <p>Once you've introduced yourself with your name, the following questions are often asked in conversation. You can also read some possible answers here:</p>
                        <ul>
                            <li><b>Woher kommst du?</b> (Where are you from?)</li>
                            <p>Answer: <b>"Ich komme aus Deutschland."</b> (I am from Germany.)</p>

                            <li><b>Wie alt bist du?</b> (How old are you?) </li>
                            <p>Answer: <b>"Ich bin vierzehn Jahre alt."</b> (I am fourteen years old.)</p>

                            <li><b>Hast du Brüder oder Schwestern?</b>(Do you have any brothers or sisters?) </li>
                            <p>Answer: <b>"Ich habe einen Bruder und eine Schwester."</b> (I have one brother and one sister.) </p>

                            <li><b>Was sind deine Hobbys?</b> (What are your hobbies?) </li>
                            <p>Answer: <b>"My hobbies are playing football and reading."</b> (Meine Hobbys sind Fußball spielen und lesen.) </p>
                        </ul>

                        <p>Remember to smile politely and maintain eye contact during the introduction to show confidence and friendliness. With these steps, you can successfully introduce yourself in German and leave a good first impression.</p>

                        <div className='alert alert-info'>
                            Tip: Practice by introducing yourself in German. You can also practice with friends or family members to introduce yourself in German.
                        </div>
                    </div>

                </>
            );
        }
    };

    return (
        <div>
            {getLesson()}
        </div>
    );
};

export default Introduction;