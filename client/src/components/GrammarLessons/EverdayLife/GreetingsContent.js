import React from 'react';

const GreetingsContent = ({ nativeLanguage, targetLanguage }) => {

    const getLesson = () => {
        
        if (nativeLanguage === 'de') {
            switch (targetLanguage) {
                case "en":
                    return (
                        <>
                            <div className=''>

                                <p> In dieser Lektion werden wir die grundlegenden Begrüßungen und Vorstellungen in der englischen Sprache erkunden. Diese sind entscheidend, um selbstbewusst in englischen Gesprächen zu starten.
                                </p>
                                <ul>

                                    <li><b>Hallo, wie geht es dir? (Hello, how are you?) </b></li>
                                    <img
                                        className='g-lesson-img float-end m-3 rounded'
                                        src="/images/Grammar/greetings.jpg"
                                        alt="greetings"
                                    />
                                    <p>"Hello" ist eine freundliche Begrüßung.
                                        "How are you?" ist die Frage nach dem Befinden.
                                        Du kannst antworten, indem du sagst, "I am good" oder "I am fine."

                                    </p>

                                    <li><b>Guten Morgen! Hast du gut geschlafen? (Good morning! Did you sleep well?)</b></li>

                                    <p>"Good morning" wünscht einen guten Morgen.
                                        "Did you sleep well?" ist eine Frage in der Vergangenheitsform.
                                        Du kannst antworten mit "Yes, I did" oder "No, I didn't."</p>

                                    <li><b>Guten Tag, es freut mich, dich wiederzusehen. (Good afternoon, it's nice to see you again.)</b></li>

                                    <p>"Good afternoon" bedeutet guten Tag.
                                        "It's nice to see you again" drückt Freude über das Wiedersehen aus.</p>

                                    <li><b>Guten Abend! Was gibt es Neues? (Good evening! What's new?)</b></li>

                                    <p>"Good evening" bedeutet guten Abend. "What's new?" ist die Frage nach Neuigkeiten.</p>

                                    <li><b>Gute Nacht, schlaf gut! (Good night, sleep tight!)</b></li>

                                    <p>"Good night" wünscht eine gute Nacht. "Sleep tight" bedeutet, gut zu schlafen.</p>
                                </ul>
                                <div className='alert alert-info'>
                                    Grammatik-Tipps:

                                    Achte darauf, dass "I" für "ich" und "you" für "du" oder "Sie" steht.
                                    Verwende "am" für "bin" und "are" für "bist" oder "sind".

                                    Diese grundlegenden Begrüßungen helfen dir, höflich und freundlich in englischen Gesprächen zu interagieren. Übe, indem du sie in Alltagssituationen anwendest!
                                </div>
                            </div>

                        </>
                    );
                default:
                    return (
                        <>
                            <div className=''>

                                <p> In dieser Lektion werden wir die grundlegenden Begrüßungen und Vorstellungen in der englischen Sprache erkunden. Diese sind entscheidend, um selbstbewusst in englischen Gesprächen zu starten.
                                </p>
                                <ul>

                                    <li><b>Hallo, wie geht es dir? (Hello, how are you?) </b></li>
                                    <img
                                        className='g-lesson-img float-end m-3 rounded'
                                        src="/images/Grammar/greetings.jpg"
                                        alt="greetings"
                                    />
                                    <p>"Hello" ist eine freundliche Begrüßung.
                                        "How are you?" ist die Frage nach dem Befinden.
                                        Du kannst antworten, indem du sagst, "I am good" oder "I am fine."

                                    </p>

                                    <li><b>Guten Morgen! Hast du gut geschlafen? (Good morning! Did you sleep well?)</b></li>

                                    <p>"Good morning" wünscht einen guten Morgen.
                                        "Did you sleep well?" ist eine Frage in der Vergangenheitsform.
                                        Du kannst antworten mit "Yes, I did" oder "No, I didn't."</p>

                                    <li><b>Guten Tag, es freut mich, dich wiederzusehen. (Good afternoon, it's nice to see you again.)</b></li>

                                    <p>"Good afternoon" bedeutet guten Tag.
                                        "It's nice to see you again" drückt Freude über das Wiedersehen aus.</p>

                                    <li><b>Guten Abend! Was gibt es Neues? (Good evening! What's new?)</b></li>

                                    <p>"Good evening" bedeutet guten Abend. "What's new?" ist die Frage nach Neuigkeiten.</p>

                                    <li><b>Gute Nacht, schlaf gut! (Good night, sleep tight!)</b></li>

                                    <p>"Good night" wünscht eine gute Nacht. "Sleep tight" bedeutet, gut zu schlafen.</p>
                                </ul>
                                <div className='alert alert-info'>
                                    Grammatik-Tipps:

                                    Achte darauf, dass "I" für "ich" und "you" für "du" oder "Sie" steht.
                                    Verwende "am" für "bin" und "are" für "bist" oder "sind".

                                    Diese grundlegenden Begrüßungen helfen dir, höflich und freundlich in englischen Gesprächen zu interagieren. Übe, indem du sie in Alltagssituationen anwendest!
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

                                <p>In this lesson, we will explore basic greetings and introductions in the German language. These are crucial to confidently start conversations in German.
                                </p>
                                <ul>

                                    <li><b>Hallo, wie geht es dir? (Hello, how are you?) </b></li>
                                    <img
                                        className='g-lesson-img float-end m-3 rounded'
                                        src="/images/Grammar/greetings.jpg"
                                        alt="greetings"
                                    />
                                    <p>"Hallo" is a friendly greeting.
                                        "Wie geht es dir?" is the inquiry about well-being.
                                        You can respond by saying, "Mir geht es gut" or "Mir geht es fein."

                                    </p>

                                    <li><b>Guten Morgen! Hast du gut geschlafen? (Good morning! Did you sleep well?)</b></li>

                                    <p>"Guten Morgen" wishes a good morning.
                                        "Hast du gut geschlafen?" is a past-tense question.
                                        You can answer with "Ja, das habe ich" or "Nein, habe ich nicht."</p>

                                    <li><b>Guten Tag, es freut mich, dich wiederzusehen. (Good afternoon, it's nice to see you again.)</b></li>

                                    <p>"Guten Tag" means good day.
                                        "Es freut mich, dich wiederzusehen" expresses joy at the reunion.</p>

                                    <li><b>Guten Abend! Was gibt es Neues? (Good evening! What's new?)</b></li>

                                    <p>"Guten Abend" means good evening. "What's new?" is the question about news.</p>

                                    <li><b>Gute Nacht, schlaf gut! (Good night, sleep tight!)</b></li>

                                    <p>"Gute Nacht" wishes a good night. "Schlaf gut" means to sleep well.</p>
                                </ul>
                                <div className='alert alert-info'>
                                    Grammar Tips:

                                    Pay attention that "I" stands for "ich" and "you" for "du" or "Sie."
                                    Use "Mir geht es" for "I am" and "gut" for "good" or "fein" for "fine."

                                    These basic greetings help you interact politely and friendly in German conversations. Practice by applying them in everyday situations!
                                </div>
                            </div>

                        </>
                    );
                default:
                    return (
                        <>
                            <div className=''>

                                <p>In this lesson, we will explore basic greetings and introductions in the German language. These are crucial to confidently start conversations in German.
                                </p>
                                <ul>

                                    <li><b>Hallo, wie geht es dir? (Hello, how are you?) </b></li>
                                    <img
                                        className='g-lesson-img float-end m-3 rounded'
                                        src="/images/Grammar/greetings.jpg"
                                        alt="greetings"
                                    />
                                    <p>"Hallo" is a friendly greeting.
                                        "Wie geht es dir?" is the inquiry about well-being.
                                        You can respond by saying, "Mir geht es gut" or "Mir geht es fein."

                                    </p>

                                    <li><b>Guten Morgen! Hast du gut geschlafen? (Good morning! Did you sleep well?)</b></li>

                                    <p>"Guten Morgen" wishes a good morning.
                                        "Hast du gut geschlafen?" is a past-tense question.
                                        You can answer with "Ja, das habe ich" or "Nein, habe ich nicht."</p>

                                    <li><b>Guten Tag, es freut mich, dich wiederzusehen. (Good afternoon, it's nice to see you again.)</b></li>

                                    <p>"Guten Tag" means good day.
                                        "Es freut mich, dich wiederzusehen" expresses joy at the reunion.</p>

                                    <li><b>Guten Abend! Was gibt es Neues? (Good evening! What's new?)</b></li>

                                    <p>"Guten Abend" means good evening. "What's new?" is the question about news.</p>

                                    <li><b>Gute Nacht, schlaf gut! (Good night, sleep tight!)</b></li>

                                    <p>"Gute Nacht" wishes a good night. "Schlaf gut" means to sleep well.</p>
                                </ul>
                                <div className='alert alert-info'>
                                    Grammar Tips:

                                    Pay attention that "I" stands for "ich" and "you" for "du" or "Sie."
                                    Use "Mir geht es" for "I am" and "gut" for "good" or "fein" for "fine."

                                    These basic greetings help you interact politely and friendly in German conversations. Practice by applying them in everyday situations!
                                </div>
                            </div>

                        </>
                    );
            }
        }else{
            return (
                <>
                    <div className=''>

                        <p>In this lesson, we will explore basic greetings and introductions in the German language. These are crucial to confidently start conversations in German.
                        </p>
                        <ul>

                            <li><b>Hallo, wie geht es dir? (Hello, how are you?) </b></li>
                            <img
                                className='g-lesson-img float-end m-3 rounded'
                                src="/images/Grammar/greetings.jpg"
                                alt="greetings"
                            />
                            <p>"Hallo" is a friendly greeting.
                                "Wie geht es dir?" is the inquiry about well-being.
                                You can respond by saying, "Mir geht es gut" or "Mir geht es fein."

                            </p>

                            <li><b>Guten Morgen! Hast du gut geschlafen? (Good morning! Did you sleep well?)</b></li>

                            <p>"Guten Morgen" wishes a good morning.
                                "Hast du gut geschlafen?" is a past-tense question.
                                You can answer with "Ja, das habe ich" or "Nein, habe ich nicht."</p>

                            <li><b>Guten Tag, es freut mich, dich wiederzusehen. (Good afternoon, it's nice to see you again.)</b></li>

                            <p>"Guten Tag" means good day.
                                "Es freut mich, dich wiederzusehen" expresses joy at the reunion.</p>

                            <li><b>Guten Abend! Was gibt es Neues? (Good evening! What's new?)</b></li>

                            <p>"Guten Abend" means good evening. "What's new?" is the question about news.</p>

                            <li><b>Gute Nacht, schlaf gut! (Good night, sleep tight!)</b></li>

                            <p>"Gute Nacht" wishes a good night. "Schlaf gut" means to sleep well.</p>
                        </ul>
                        <div className='alert alert-info'>
                            Grammar Tips:

                            Pay attention that "I" stands for "ich" and "you" for "du" or "Sie."
                            Use "Mir geht es" for "I am" and "gut" for "good" or "fein" for "fine."

                            These basic greetings help you interact politely and friendly in German conversations. Practice by applying them in everyday situations!
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

export default GreetingsContent;