import React from 'react';

const SimplePresent = ({ nativeLanguage, targetLanguage, isLesson }) => {
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

                                <p>In dieser Lektion werden wir die Verwendung der Simple Present-Tense im Deutschen für die Beschreibung von persönlichen Gewohnheiten und Fakten erkunden. Diese Zeitform ist entscheidend, um auf Deutsch über regelmäßige Aktivitäten und allgemeine Aussagen zu sprechen.
                                </p>
                                <ol>

                                    <li><b>I play tennis every day. (Ich spiele jeden Tag Tennis.)</b></li>

                                    <img
                                        className='g-lesson-img float-end m-3 rounded'
                                        src="/images/Grammar/simplePresent.jpg"
                                        alt="simple_present_tennis"
                                    />
                                    <p>"I play" ist die Simple Present-Form von "spielen." Diese Struktur wird verwendet, um über regelmäßige Aktivitäten zu sprechen.</p>

                                    <li><b>The sun rises in the east. (Die Sonne geht im Osten auf.)</b></li>

                                    <p>"The sun rises" ist die Simple Present-Form von "aufgehen." Diese Struktur wird verwendet, um allgemeine Fakten oder Wahrheiten auszudrücken.</p>

                                    <li><b>My brother works in an office. (Mein Bruder arbeitet in einem Büro.)</b></li>

                                    <p>"My brother works" ist die Simple Present-Form von "arbeiten." Diese Struktur wird verwendet, um über regelmäßige berufliche Aktivitäten zu sprechen.</p>

                                    <li><b>We learn German at the university. (Wir lernen Deutsch an der Universität.)</b></li>


                                    <p>"We learn" ist die Simple Present-Form von "lernen." Diese Struktur wird verwendet, um über laufende oder regelmäßige Lernaktivitäten zu sprechen.</p>

                                    <li><b>The sea freezes at zero degrees Celsius. (Das Meer friert bei null Grad Celsius.)</b></li>

                                    <p>"The sea freezes" ist die Simple Present-Form von "frieren." Diese Struktur wird verwendet, um allgemeine Fakten oder Naturphänomene auszudrücken.</p>
                                </ol>
                                <div className='alert alert-info'>
                                    Tipp:

                                    Die Simple Present-Tense ist entscheidend, um über regelmäßige Aktivitäten und Fakten auf Englisch zu sprechen. Übe ihre Anwendung in deinen Unterhaltungen!
                                </div>
                            </div>



                        </>
                    );
                default:
                    return (
                        <>
                            <div className=''>

                                <p>In dieser Lektion werden wir die Verwendung der Simple Present-Tense im Deutschen für die Beschreibung von persönlichen Gewohnheiten und Fakten erkunden. Diese Zeitform ist entscheidend, um auf Deutsch über regelmäßige Aktivitäten und allgemeine Aussagen zu sprechen.
                                </p>
                                <ol>

                                    <li><b>I play tennis every day. (Ich spiele jeden Tag Tennis.)</b></li>

                                    <img
                                        className='g-lesson-img float-end m-3 rounded'
                                        src="/images/Grammar/simplePresent.jpg"
                                        alt="simple_present_tennis"
                                    />
                                    <p>"I play" ist die Simple Present-Form von "spielen." Diese Struktur wird verwendet, um über regelmäßige Aktivitäten zu sprechen.</p>

                                    <li><b>The sun rises in the east. (Die Sonne geht im Osten auf.)</b></li>

                                    <p>"The sun rises" ist die Simple Present-Form von "aufgehen." Diese Struktur wird verwendet, um allgemeine Fakten oder Wahrheiten auszudrücken.</p>

                                    <li><b>My brother works in an office. (Mein Bruder arbeitet in einem Büro.)</b></li>

                                    <p>"My brother works" ist die Simple Present-Form von "arbeiten." Diese Struktur wird verwendet, um über regelmäßige berufliche Aktivitäten zu sprechen.</p>

                                    <li><b>We learn German at the university. (Wir lernen Deutsch an der Universität.)</b></li>


                                    <p>"We learn" ist die Simple Present-Form von "lernen." Diese Struktur wird verwendet, um über laufende oder regelmäßige Lernaktivitäten zu sprechen.</p>

                                    <li><b>The sea freezes at zero degrees Celsius. (Das Meer friert bei null Grad Celsius.)</b></li>

                                    <p>"The sea freezes" ist die Simple Present-Form von "frieren." Diese Struktur wird verwendet, um allgemeine Fakten oder Naturphänomene auszudrücken.</p>
                                </ol>
                                <div className='alert alert-info'>
                                    Tipp:

                                    Die Simple Present-Tense ist entscheidend, um über regelmäßige Aktivitäten und Fakten auf Englisch zu sprechen. Übe ihre Anwendung in deinen Unterhaltungen!
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

                                <p>In this lesson, we will explore the use of the Simple Present Tense in German to describe personal habits and facts. This tense is crucial for discussing routine activities and general statements in German.
                                </p>
                                <ol>

                                    <li><b>I play tennis every day. (Ich spiele jeden Tag Tennis.)</b></li>
                                    <img
                                        className='g-lesson-img float-end m-3 rounded'
                                        src="/images/Grammar/simplePresent.jpg"
                                        alt="simplePresent"
                                    />
                                    <p>"I play" is the Simple Present form of the German verb "spielen." This structure is used to talk about regular activities.</p>

                                    <li><b>The sun rises in the east. (Die Sonne geht im Osten auf.)</b></li>

                                    <p>"The sun rises" is the Simple Present form of the German verb "aufgehen." This structure is used to express general facts or truths.</p>

                                    <li><b>My brother works in an office. (Mein Bruder arbeitet in einem Büro.)</b></li>

                                    <p>"My brother works" is the Simple Present form of the German verb "arbeiten." This structure is used to talk about regular professional activities.</p>

                                    <li><b>We learn German at the university. (Wir lernen Deutsch an der Universität.)</b></li>

                                    <p>"We learn" is the Simple Present form of the German verb "lernen." This structure is used to talk about ongoing or regular learning activities.</p>

                                    <li><b>The sea freezes at zero degrees Celsius. (Das Meer friert bei null Grad Celsius.)</b></li>

                                    <p>"The sea freezes" is the Simple Present form of the German verb "frieren." This structure is used to express general facts or natural phenomena.</p>
                                </ol>
                                <div className='alert alert-info'>
                                    Tip:

                                    The Simple Present Tense is crucial for discussing regular activities and facts in German. Practice using it in your conversations!
                                </div>
                            </div>



                        </>
                    );
                default:
                    return (
                        <>
                            <div className=''>

                                <p>In this lesson, we will explore the use of the Simple Present Tense in German to describe personal habits and facts. This tense is crucial for discussing routine activities and general statements in German.
                                </p>
                                <ol>

                                    <li><b>I play tennis every day. (Ich spiele jeden Tag Tennis.)</b></li>
                                    <img
                                        className='g-lesson-img float-end m-3 rounded'
                                        src="/images/Grammar/simplePresent.jpg"
                                        alt="simplePresent"
                                    />
                                    <p>"I play" is the Simple Present form of the German verb "spielen." This structure is used to talk about regular activities.</p>

                                    <li><b>The sun rises in the east. (Die Sonne geht im Osten auf.)</b></li>

                                    <p>"The sun rises" is the Simple Present form of the German verb "aufgehen." This structure is used to express general facts or truths.</p>

                                    <li><b>My brother works in an office. (Mein Bruder arbeitet in einem Büro.)</b></li>

                                    <p>"My brother works" is the Simple Present form of the German verb "arbeiten." This structure is used to talk about regular professional activities.</p>

                                    <li><b>We learn German at the university. (Wir lernen Deutsch an der Universität.)</b></li>

                                    <p>"We learn" is the Simple Present form of the German verb "lernen." This structure is used to talk about ongoing or regular learning activities.</p>

                                    <li><b>The sea freezes at zero degrees Celsius. (Das Meer friert bei null Grad Celsius.)</b></li>

                                    <p>"The sea freezes" is the Simple Present form of the German verb "frieren." This structure is used to express general facts or natural phenomena.</p>
                                </ol>
                                <div className='alert alert-info'>
                                    Tip:

                                    The Simple Present Tense is crucial for discussing regular activities and facts in German. Practice using it in your conversations!
                                </div>
                            </div>



                        </>
                    );
            }
        }else{
            return (
                <>
                    <div className=''>

                        <p>In this lesson, we will explore the use of the Simple Present Tense in German to describe personal habits and facts. This tense is crucial for discussing routine activities and general statements in German.
                        </p>
                        <ol>

                            <li><b>I play tennis every day. (Ich spiele jeden Tag Tennis.)</b></li>
                            <img
                                className='g-lesson-img float-end m-3 rounded'
                                src="/images/Grammar/simplePresent.jpg"
                                alt="simplePresent"
                            />
                            <p>"I play" is the Simple Present form of the German verb "spielen." This structure is used to talk about regular activities.</p>

                            <li><b>The sun rises in the east. (Die Sonne geht im Osten auf.)</b></li>

                            <p>"The sun rises" is the Simple Present form of the German verb "aufgehen." This structure is used to express general facts or truths.</p>

                            <li><b>My brother works in an office. (Mein Bruder arbeitet in einem Büro.)</b></li>

                            <p>"My brother works" is the Simple Present form of the German verb "arbeiten." This structure is used to talk about regular professional activities.</p>

                            <li><b>We learn German at the university. (Wir lernen Deutsch an der Universität.)</b></li>

                            <p>"We learn" is the Simple Present form of the German verb "lernen." This structure is used to talk about ongoing or regular learning activities.</p>

                            <li><b>The sea freezes at zero degrees Celsius. (Das Meer friert bei null Grad Celsius.)</b></li>

                            <p>"The sea freezes" is the Simple Present form of the German verb "frieren." This structure is used to express general facts or natural phenomena.</p>
                        </ol>
                        <div className='alert alert-info'>
                            Tip:

                            The Simple Present Tense is crucial for discussing regular activities and facts in German. Practice using it in your conversations!
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

export default SimplePresent;