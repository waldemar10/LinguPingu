import React from 'react';

const SimplePast = ({ nativeLanguage, targetLanguage}) => {

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

                                    <li><b>Yesterday, I visited the museum. (Gestern habe ich das Museum besucht.)</b></li>
                                    <img
                                        className='g-lesson-img float-end m-3 rounded'
                                        src="/images/Grammar/simplePast.jpg"
                                        alt="simplePast"
                                    />
                                    <p>"Yesterday" bedeutet "gestern". "Visited" ist die Simple Past-Form von "to visit" (besuchen). Diese Struktur wird verwendet, um über kürzlich vergangene Aktivitäten zu sprechen.</p>

                                    <li><b>Last summer, I traveled to Spain. (Letzten Sommer bin ich nach Spanien gereist.)</b></li>

                                    <p>"Last summer" bedeutet "letzten Sommer". "Traveled" ist die Simple Past-Form von "to travel" (reisen). Diese Struktur wird verwendet, um über vergangene Ereignisse oder Reisen zu sprechen.</p>

                                    <li><b>As a child, I often played in the park. (Als Kind habe ich oft im Park gespielt.)</b></li>

                                    <p>"As a child" bedeutet "als Kind". "Played" ist die Simple Past-Form von "to play" (spielen). Diese Struktur wird verwendet, um über vergangene Gewohnheiten oder Aktivitäten zu sprechen.</p>

                                    <li><b>Last week, I celebrated my birthday. (Letzte Woche habe ich meinen Geburtstag gefeiert.)</b></li>

                                    <p>"Last week" bedeutet "letzte Woche". "Celebrated" ist die Simple Past-Form von "to celebrate" (feiern). Diese Struktur wird verwendet, um über spezifische Ereignisse in der Vergangenheit zu sprechen.</p>

                                    <li><b>During the vacation, we visited historical sites. (Im Urlaub haben wir historische Stätten besucht.)</b></li>

                                    <p>"During the vacation" bedeutet "im Urlaub". "Visited" ist die Simple Past-Form von "to visit" (besuchen), hier verwendet, um über vergangene Urlaubserlebnisse zu sprechen.</p>
                                </ol>
                                <div className='alert alert-info'>
                                    Grammatik-Tipps:

                                    Beachte, dass "I" für "ich" steht.
                                    Verwende die Simple Past-Formen wie "traveled", "played", "celebrated" und "visited".

                                    Die Simple Past-Tense ist entscheidend, um über vergangene Erfahrungen auf Englisch zu erzählen. Übe ihre Anwendung in deinen Unterhaltungen!
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

                                    <li><b>Yesterday, I visited the museum. (Gestern habe ich das Museum besucht.)</b></li>
                                    <img
                                        className='g-lesson-img float-end m-3 rounded'
                                        src="/images/Grammar/simplePast.jpg"
                                        alt="simplePast"
                                    />
                                    <p>"Yesterday" bedeutet "gestern". "Visited" ist die Simple Past-Form von "to visit" (besuchen). Diese Struktur wird verwendet, um über kürzlich vergangene Aktivitäten zu sprechen.</p>

                                    <li><b>Last summer, I traveled to Spain. (Letzten Sommer bin ich nach Spanien gereist.)</b></li>

                                    <p>"Last summer" bedeutet "letzten Sommer". "Traveled" ist die Simple Past-Form von "to travel" (reisen). Diese Struktur wird verwendet, um über vergangene Ereignisse oder Reisen zu sprechen.</p>

                                    <li><b>As a child, I often played in the park. (Als Kind habe ich oft im Park gespielt.)</b></li>

                                    <p>"As a child" bedeutet "als Kind". "Played" ist die Simple Past-Form von "to play" (spielen). Diese Struktur wird verwendet, um über vergangene Gewohnheiten oder Aktivitäten zu sprechen.</p>

                                    <li><b>Last week, I celebrated my birthday. (Letzte Woche habe ich meinen Geburtstag gefeiert.)</b></li>

                                    <p>"Last week" bedeutet "letzte Woche". "Celebrated" ist die Simple Past-Form von "to celebrate" (feiern). Diese Struktur wird verwendet, um über spezifische Ereignisse in der Vergangenheit zu sprechen.</p>

                                    <li><b>During the vacation, we visited historical sites. (Im Urlaub haben wir historische Stätten besucht.)</b></li>

                                    <p>"During the vacation" bedeutet "im Urlaub". "Visited" ist die Simple Past-Form von "to visit" (besuchen), hier verwendet, um über vergangene Urlaubserlebnisse zu sprechen.</p>
                                </ol>
                                <div className='alert alert-info'>
                                    Grammatik-Tipps:

                                    Beachte, dass "I" für "ich" steht.
                                    Verwende die Simple Past-Formen wie "traveled", "played", "celebrated" und "visited".

                                    Die Simple Past-Tense ist entscheidend, um über vergangene Erfahrungen auf Englisch zu erzählen. Übe ihre Anwendung in deinen Unterhaltungen!
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

                                <p>In this lesson, we will explore the use of the Simple Past Tense in German to talk about personal experiences. This tense is crucial for sharing past events in German.
                                </p>
                                <ol>

                                    <li><b>Gestern besuchte ich das Museum. (Yesterday, I visited the museum.)</b></li>
                                    <img
                                        className='g-lesson-img float-end m-3 rounded'
                                        src="/images/Grammar/simplePast.jpg"
                                        alt="simplePast"
                                    />
                                    <p>"Gestern" means "yesterday." "Besuchte" is the past tense of "besuchen," which means "to visit." You can use this structure to talk about recent past activities.</p>

                                    <li><b>Letzten Sommer reiste ich nach Spanien. (Last summer, I traveled to Spain.)</b></li>

                                    <p>"Letzten Sommer" means "last summer." "Reiste" is the past tense of "reisen," which means "to travel." This structure is used to discuss past events or trips.</p>

                                    <li><b>Als Kind spielte ich oft im Park. (As a child, I often played in the park.)</b></li>

                                    <p>"Als Kind" means "as a child." "Spielte" is the past tense of "spielen," which means "to play." You can use this to talk about past habits or activities.</p>

                                    <li><b>Letzte Woche feierte ich meinen Geburtstag. (Last week, I celebrated my birthday.)</b></li>

                                    <p>"Letzte Woche" means "last week." "Feierte" is the past tense of "feiern," which means "to celebrate." This structure is used to discuss specific events in the past.</p>

                                    <li><b>Im Urlaub besuchten wir historische Stätten. (During the vacation, we visited historical sites.)</b></li>

                                    <p>"Im Urlaub" means "during the vacation." "Besuchten" is the past tense of "besuchen," used here to talk about past vacation experiences.</p>
                                </ol>
                                <div className='alert alert-info'>
                                    Grammar Tips:

                                    Pay attention that "I" stands for "ich."
                                    Use the Simple Past Tense forms like "besuchte," "reiste," "spielte," "feierte," and "besuchten."

                                    The Simple Past Tense is essential for narrating past experiences in German. Practice using it in your conversations!
                                </div>
                            </div>


                        </>
                    );
                default:
                    return (
                        <>
                            <div className=''>

                                <p>In this lesson, we will explore the use of the Simple Past Tense in German to talk about personal experiences. This tense is crucial for sharing past events in German.
                                </p>
                                <ol>

                                    <li><b>Gestern besuchte ich das Museum. (Yesterday, I visited the museum.)</b></li>
                                    <img
                                        className='g-lesson-img float-end m-3 rounded'
                                        src="/images/Grammar/simplePast.jpg"
                                        alt="simplePast"
                                    />
                                    <p>"Gestern" means "yesterday." "Besuchte" is the past tense of "besuchen," which means "to visit." You can use this structure to talk about recent past activities.</p>

                                    <li><b>Letzten Sommer reiste ich nach Spanien. (Last summer, I traveled to Spain.)</b></li>

                                    <p>"Letzten Sommer" means "last summer." "Reiste" is the past tense of "reisen," which means "to travel." This structure is used to discuss past events or trips.</p>

                                    <li><b>Als Kind spielte ich oft im Park. (As a child, I often played in the park.)</b></li>

                                    <p>"Als Kind" means "as a child." "Spielte" is the past tense of "spielen," which means "to play." You can use this to talk about past habits or activities.</p>

                                    <li><b>Letzte Woche feierte ich meinen Geburtstag. (Last week, I celebrated my birthday.)</b></li>

                                    <p>"Letzte Woche" means "last week." "Feierte" is the past tense of "feiern," which means "to celebrate." This structure is used to discuss specific events in the past.</p>

                                    <li><b>Im Urlaub besuchten wir historische Stätten. (During the vacation, we visited historical sites.)</b></li>

                                    <p>"Im Urlaub" means "during the vacation." "Besuchten" is the past tense of "besuchen," used here to talk about past vacation experiences.</p>
                                </ol>
                                <div className='alert alert-info'>
                                    Grammar Tips:

                                    Pay attention that "I" stands for "ich."
                                    Use the Simple Past Tense forms like "besuchte," "reiste," "spielte," "feierte," and "besuchten."

                                    The Simple Past Tense is essential for narrating past experiences in German. Practice using it in your conversations!
                                </div>
                            </div>


                        </>
                    );
            }
        }else{
            return (
                <>
                    <div className=''>

                        <p>In this lesson, we will explore the use of the Simple Past Tense in German to talk about personal experiences. This tense is crucial for sharing past events in German.
                        </p>
                        <ol>

                            <li><b>Gestern besuchte ich das Museum. (Yesterday, I visited the museum.)</b></li>
                            <img
                                className='g-lesson-img float-end m-3 rounded'
                                src="/images/Grammar/simplePast.jpg"
                                alt="simplePast"
                            />
                            <p>"Gestern" means "yesterday." "Besuchte" is the past tense of "besuchen," which means "to visit." You can use this structure to talk about recent past activities.</p>

                            <li><b>Letzten Sommer reiste ich nach Spanien. (Last summer, I traveled to Spain.)</b></li>

                            <p>"Letzten Sommer" means "last summer." "Reiste" is the past tense of "reisen," which means "to travel." This structure is used to discuss past events or trips.</p>

                            <li><b>Als Kind spielte ich oft im Park. (As a child, I often played in the park.)</b></li>

                            <p>"Als Kind" means "as a child." "Spielte" is the past tense of "spielen," which means "to play." You can use this to talk about past habits or activities.</p>

                            <li><b>Letzte Woche feierte ich meinen Geburtstag. (Last week, I celebrated my birthday.)</b></li>

                            <p>"Letzte Woche" means "last week." "Feierte" is the past tense of "feiern," which means "to celebrate." This structure is used to discuss specific events in the past.</p>

                            <li><b>Im Urlaub besuchten wir historische Stätten. (During the vacation, we visited historical sites.)</b></li>

                            <p>"Im Urlaub" means "during the vacation." "Besuchten" is the past tense of "besuchen," used here to talk about past vacation experiences.</p>
                        </ol>
                        <div className='alert alert-info'>
                            Grammar Tips:

                            Pay attention that "I" stands for "ich."
                            Use the Simple Past Tense forms like "besuchte," "reiste," "spielte," "feierte," and "besuchten."

                            The Simple Past Tense is essential for narrating past experiences in German. Practice using it in your conversations!
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

export default SimplePast;