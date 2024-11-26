import React from 'react';

const PresentPerfect = ({ nativeLanguage, targetLanguage}) => {

    const getLesson = () => {

        if (nativeLanguage === 'de') {
            switch (targetLanguage) {
                case 'en':
                    return (
                        <>
                            <div className=''>

                                <p>In dieser Lektion werden wir die Verwendung der Simple Past-Tense im Englischen für die Beschreibung persönlicher Erfahrungen erkunden. Diese Zeitform ist entscheidend, um über vergangene Ereignisse auf Englisch zu sprechen.
                                </p>
                                <ol>

                                    <li><b>I have visited Paris. (Ich habe Paris besucht.)</b></li>
                                    <img
                                        className='g-lesson-img float-end m-3 rounded'
                                        src="/images/Grammar/presentPerfect.jpg"
                                        alt="presentPerfect"
                                    />
                                    <p>"I have visited" ist die Perfektform von "besuchen." Diese Struktur wird verwendet, um über Erfahrungen in der Vergangenheit zu sprechen, die für die Gegenwart relevant sind.</p>

                                    <li><b>We have lived in Berlin for five years. (Wir leben seit fünf Jahren in Berlin.)</b></li>

                                    <p>"We have lived" ist die Perfektform von "leben." Diese Struktur wird verwendet, um eine Handlung auszudrücken, die in der Vergangenheit begonnen hat und bis in die Gegenwart fortbesteht.</p>

                                    <li><b>She has learned English. (Sie hat Englisch gelernt.)</b></li>

                                    <p>"She has learned" ist die Perfektform von "lernen." Diese Struktur wird verwendet, um über abgeschlossene Handlungen oder Erfahrungen in der Vergangenheit mit Bezug zur Gegenwart zu sprechen.</p>

                                    <li><b>They have just finished their project. (Sie haben gerade ihr Projekt abgeschlossen.)</b></li>

                                    <p>"They have finished" ist die Perfektform von "abschließen." Diese Struktur wird verwendet, um über kürzlich abgeschlossene Handlungen mit Relevanz für die Gegenwart zu sprechen.</p>


                                    <li><b>He has never eaten sushi. (Er hat noch nie Sushi gegessen.)</b></li>

                                    <p>"He has eaten" ist die Perfektform von "essen." Diese Struktur wird verwendet, um Erfahrungen oder Handlungen auszudrücken, die zu keinem bestimmten Zeitpunkt vor jetzt stattgefunden haben.</p>
                                </ol>
                                <div className='alert alert-info'>
                                    Tipp:

                                    Das Perfekt ist entscheidend, um vergangene Handlungen mit Bezug zur Gegenwart im Deutschen auszudrücken. Üben Sie die Anwendung in Ihren Gesprächen!
                                </div>
                            </div>


                        </>
                    );
                default:
                    return (
                        <>
                            <div className=''>

                                <p>In dieser Lektion werden wir die Verwendung der Simple Past-Tense im Englischen für die Beschreibung persönlicher Erfahrungen erkunden. Diese Zeitform ist entscheidend, um über vergangene Ereignisse auf Englisch zu sprechen.
                                </p>
                                <ol>

                                    <li><b>I have visited Paris. (Ich habe Paris besucht.)</b></li>
                                    <img
                                        className='g-lesson-img float-end m-3 rounded'
                                        src="/images/Grammar/presentPerfect.jpg"
                                        alt="presentPerfect"
                                    />
                                    <p>"I have visited" ist die Perfektform von "besuchen." Diese Struktur wird verwendet, um über Erfahrungen in der Vergangenheit zu sprechen, die für die Gegenwart relevant sind.</p>

                                    <li><b>We have lived in Berlin for five years. (Wir leben seit fünf Jahren in Berlin.)</b></li>

                                    <p>"We have lived" ist die Perfektform von "leben." Diese Struktur wird verwendet, um eine Handlung auszudrücken, die in der Vergangenheit begonnen hat und bis in die Gegenwart fortbesteht.</p>

                                    <li><b>She has learned English. (Sie hat Englisch gelernt.)</b></li>

                                    <p>"She has learned" ist die Perfektform von "lernen." Diese Struktur wird verwendet, um über abgeschlossene Handlungen oder Erfahrungen in der Vergangenheit mit Bezug zur Gegenwart zu sprechen.</p>

                                    <li><b>They have just finished their project. (Sie haben gerade ihr Projekt abgeschlossen.)</b></li>

                                    <p>"They have finished" ist die Perfektform von "abschließen." Diese Struktur wird verwendet, um über kürzlich abgeschlossene Handlungen mit Relevanz für die Gegenwart zu sprechen.</p>


                                    <li><b>He has never eaten sushi. (Er hat noch nie Sushi gegessen.)</b></li>

                                    <p>"He has eaten" ist die Perfektform von "essen." Diese Struktur wird verwendet, um Erfahrungen oder Handlungen auszudrücken, die zu keinem bestimmten Zeitpunkt vor jetzt stattgefunden haben.</p>
                                </ol>
                                <div className='alert alert-info'>
                                    Tipp:

                                    Das Perfekt ist entscheidend, um vergangene Handlungen mit Bezug zur Gegenwart im Deutschen auszudrücken. Üben Sie die Anwendung in Ihren Gesprächen!
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

                                <p>In this lesson, we will explore the use of the Perfekt tense in German to describe personal experiences. This tense is crucial for talking about past events in German.
                                </p>
                                <ol>

                                    <li><b>Ich habe Paris besucht. (I have visited Paris.)</b></li>
                                    <img
                                        className='g-lesson-img float-end m-3 rounded'
                                        src="/images/Grammar/presentPerfect.jpg"
                                        alt="presentPerfect"
                                    />
                                    <p>"I have visited" is the English translation for "Ich habe besucht." This structure is used to talk about experiences in the past that are relevant to the present.</p>

                                    <li><b>Wir leben seit fünf Jahren in Berlin. (We have lived in Berlin for five years.)</b></li>

                                    <p>"We have lived" is the English translation for "Wir haben gelebt." This structure is used to express an action that started in the past and continues into the present.</p>

                                    <li><b>Sie hat Englisch gelernt. (She has learned English.)</b></li>

                                    <p>"She has learned" is the English translation for "Sie hat gelernt." This structure is used to talk about completed actions or experiences in the past with a connection to the present.</p>

                                    <li><b>Sie haben gerade ihr Projekt abgeschlossen. (They have just finished their project.)</b></li>

                                    <p>"They have finished" is the English translation for "Sie haben abgeschlossen." This structure is used to talk about recently completed actions with relevance to the present.</p>

                                    <li><b>Er hat noch nie Sushi gegessen. (He has never eaten sushi.)</b></li>

                                    <p>"He has eaten" is the English translation for "Er hat gegessen." This structure is used to express experiences or actions that have not happened at any unspecified time before now.</p>
                                </ol>
                                <div className='alert alert-info'>
                                    Tip:

                                    The Perfekt tense is crucial for expressing past actions with a connection to the present in German. Practice using it in your conversations!
                                </div>
                            </div>


                        </>
                    );
                default:
                    return (
                        <>
                            <div className=''>

                                <p>In this lesson, we will explore the use of the Perfekt tense in German to describe personal experiences. This tense is crucial for talking about past events in German.
                                </p>
                                <ol>

                                    <li><b>Ich habe Paris besucht. (I have visited Paris.)</b></li>
                                    <img
                                        className='g-lesson-img float-end m-3 rounded'
                                        src="/images/Grammar/presentPerfect.jpg"
                                        alt="presentPerfect"
                                    />
                                    <p>"I have visited" is the English translation for "Ich habe besucht." This structure is used to talk about experiences in the past that are relevant to the present.</p>

                                    <li><b>Wir leben seit fünf Jahren in Berlin. (We have lived in Berlin for five years.)</b></li>

                                    <p>"We have lived" is the English translation for "Wir haben gelebt." This structure is used to express an action that started in the past and continues into the present.</p>

                                    <li><b>Sie hat Englisch gelernt. (She has learned English.)</b></li>

                                    <p>"She has learned" is the English translation for "Sie hat gelernt." This structure is used to talk about completed actions or experiences in the past with a connection to the present.</p>

                                    <li><b>Sie haben gerade ihr Projekt abgeschlossen. (They have just finished their project.)</b></li>

                                    <p>"They have finished" is the English translation for "Sie haben abgeschlossen." This structure is used to talk about recently completed actions with relevance to the present.</p>

                                    <li><b>Er hat noch nie Sushi gegessen. (He has never eaten sushi.)</b></li>

                                    <p>"He has eaten" is the English translation for "Er hat gegessen." This structure is used to express experiences or actions that have not happened at any unspecified time before now.</p>
                                </ol>
                                <div className='alert alert-info'>
                                    Tip:

                                    The Perfekt tense is crucial for expressing past actions with a connection to the present in German. Practice using it in your conversations!
                                </div>
                            </div>


                        </>
                    );
            }
        }else{
            return (
                <>
                    <div className=''>

                        <p>In this lesson, we will explore the use of the Perfekt tense in German to describe personal experiences. This tense is crucial for talking about past events in German.
                        </p>
                        <ol>

                            <li><b>Ich habe Paris besucht. (I have visited Paris.)</b></li>
                            <img
                                className='g-lesson-img float-end m-3 rounded'
                                src="/images/Grammar/presentPerfect.jpg"
                                alt="presentPerfect"
                            />
                            <p>"I have visited" is the English translation for "Ich habe besucht." This structure is used to talk about experiences in the past that are relevant to the present.</p>

                            <li><b>Wir leben seit fünf Jahren in Berlin. (We have lived in Berlin for five years.)</b></li>

                            <p>"We have lived" is the English translation for "Wir haben gelebt." This structure is used to express an action that started in the past and continues into the present.</p>

                            <li><b>Sie hat Englisch gelernt. (She has learned English.)</b></li>

                            <p>"She has learned" is the English translation for "Sie hat gelernt." This structure is used to talk about completed actions or experiences in the past with a connection to the present.</p>

                            <li><b>Sie haben gerade ihr Projekt abgeschlossen. (They have just finished their project.)</b></li>

                            <p>"They have finished" is the English translation for "Sie haben abgeschlossen." This structure is used to talk about recently completed actions with relevance to the present.</p>

                            <li><b>Er hat noch nie Sushi gegessen. (He has never eaten sushi.)</b></li>

                            <p>"He has eaten" is the English translation for "Er hat gegessen." This structure is used to express experiences or actions that have not happened at any unspecified time before now.</p>
                        </ol>
                        <div className='alert alert-info'>
                            Tip:

                            The Perfekt tense is crucial for expressing past actions with a connection to the present in German. Practice using it in your conversations!
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

export default PresentPerfect;