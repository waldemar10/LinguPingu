import React from 'react';

const RestaurantOrder = ({ nativeLanguage, targetLanguage }) => {

    const getLesson = () => {

        if (nativeLanguage === 'de') {
            switch (targetLanguage) {
                case 'en':
                    return (
                        <>
                            <div className=''>
                                <p>Die Fähigkeit, auf Englisch zu bestellen, ist entscheidend, wenn man in englischsprachiger Umgebung isst.</p>
                                <p>Wenn Sie eine Bestellung aufgeben, sagen Sie dem Kellner, was Sie haben möchten.</p>
                                <img
                                    className='g-lesson-img float-end m-3 rounded'
                                    src="/images/Grammar/restaurant.jpg"
                                    alt="restaurant"
                                />
                                <ul>
                                    <li><b>I would like a pizza, please. </b> (Ich hätte gerne eine Pizza, bitte.)</li>
                                </ul>

                                <p>Wenn Sie Ihre Bestellung aufgegeben haben, kann es sein, dass der Kellner Ihnen weitere Fragen stellt. Hier können Sie auch einige mögliche Antworten lesen:</p>
                                <ul>
                                    <li><b>What toppings would you like on your pizza?</b> (Was für Beläge möchten Sie auf Ihrer Pizza?)</li>
                                    <p>Answer: <b>"I would like ham and mushrooms, please."</b> (Ich hätte gerne Schinken und Champignons, bitte.)</p>

                                    <li><b>What size would you like?</b> (Welche Größe möchten Sie?) </li>
                                    <p>Answer: <b>"I would like the medium size."</b> (Ich möchte die mittlere Größe.)</p>

                                    <li><b>Would you like something to drink?</b>(Möchten Sie etwas zu trinken?) </li>
                                    <p>Answer: <b>"I would like a cola."</b> (Ich hätte gerne eine Cola.) </p>

                                    <li><b>Is there a dessert you recommend?</b> (Gibt es einen Nachtisch, den Sie empfehlen?) </li>
                                    <p>Answer: <b>"What is the recommended dessert?"</b> (Was ist der empfohlene Nachtisch?) </p>
                                </ul>

                                <p>Denken Sie daran, höflich zu sein und sich nach der Bestellung beim Kellner zu bedanken, um Ihre Wertschätzung zu zeigen. Mit diesen Schritten können Sie erfolgreich auf Englisch in einem Restaurant bestellen und Ihr Essen genießen.</p>

                                <div className='alert alert-info'>
                                    Tipp: Üben Sie das Bestellen auf Englisch, indem Sie Restaurant-Szenarien simulieren. Sie können auch mit Freunden oder Familienmitgliedern üben, um Ihre englischen Bestellfähigkeiten zu verbessern.
                                </div>
                            </div>


                        </>
                    );
                default:
                    return (
                        <>
                            <div className=''>
                                <p>Die Fähigkeit, auf Englisch zu bestellen, ist entscheidend, wenn man in englischsprachiger Umgebung isst.</p>
                                <p>Wenn Sie eine Bestellung aufgeben, sagen Sie dem Kellner, was Sie haben möchten.</p>
                                <img
                                    className='g-lesson-img float-end m-3 rounded'
                                    src="/images/Grammar/restaurant.jpg"
                                    alt="restaurant"
                                />
                                <ul>
                                    <li><b>I would like a pizza, please. </b> (Ich hätte gerne eine Pizza, bitte.)</li>
                                </ul>

                                <p>Wenn Sie Ihre Bestellung aufgegeben haben, kann es sein, dass der Kellner Ihnen weitere Fragen stellt. Hier können Sie auch einige mögliche Antworten lesen:</p>
                                <ul>
                                    <li><b>What toppings would you like on your pizza?</b> (Was für Beläge möchten Sie auf Ihrer Pizza?)</li>
                                    <p>Answer: <b>"I would like ham and mushrooms, please."</b> (Ich hätte gerne Schinken und Champignons, bitte.)</p>

                                    <li><b>What size would you like?</b> (Welche Größe möchten Sie?) </li>
                                    <p>Answer: <b>"I would like the medium size."</b> (Ich möchte die mittlere Größe.)</p>

                                    <li><b>Would you like something to drink?</b>(Möchten Sie etwas zu trinken?) </li>
                                    <p>Answer: <b>"I would like a cola."</b> (Ich hätte gerne eine Cola.) </p>

                                    <li><b>Is there a dessert you recommend?</b> (Gibt es einen Nachtisch, den Sie empfehlen?) </li>
                                    <p>Answer: <b>"What is the recommended dessert?"</b> (Was ist der empfohlene Nachtisch?) </p>
                                </ul>

                                <p>Denken Sie daran, höflich zu sein und sich nach der Bestellung beim Kellner zu bedanken, um Ihre Wertschätzung zu zeigen. Mit diesen Schritten können Sie erfolgreich auf Englisch in einem Restaurant bestellen und Ihr Essen genießen.</p>

                                <div className='alert alert-info'>
                                    Tipp: Üben Sie das Bestellen auf Englisch, indem Sie Restaurant-Szenarien simulieren. Sie können auch mit Freunden oder Familienmitgliedern üben, um Ihre englischen Bestellfähigkeiten zu verbessern.
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
                                <p>The ability to order in German is crucial when dining in German-speaking environments.</p>
                                <p>When you place an order, tell the waiter what you would like.</p>
                                <img
                                    className='g-lesson-img float-end m-3 rounded'
                                    src="/images/Grammar/restaurant.jpg"
                                    alt="restaurant"
                                />
                                <ul>
                                    <li><b>Ich möchte eine Pizza, bitte. </b> (I would like a pizza, please.)</li>
                                </ul>

                                <p>Once you've placed your order, the server might ask you additional questions. You can also read some possible answers here:</p>
                                <ul>
                                    <li><b>Was für Beläge möchten Sie auf Ihrer Pizza?</b> (What toppings would you like on your pizza?)</li>
                                    <p>Answer: <b>"Ich hätte gerne Schinken und Champignons, bitte."</b> (I would like ham and mushrooms, please.)</p>

                                    <li><b>Welche Größe möchten Sie?</b> (What size would you like?) </li>
                                    <p>Answer: <b>"Ich möchte die mittlere Größe."</b> (I would like the medium size.)</p>

                                    <li><b>Möchten Sie etwas zu trinken?</b>(Would you like something to drink?) </li>
                                    <p>Answer: <b>"Ich hätte gerne eine Cola."</b> (I would like a cola.) </p>

                                    <li><b>Gibt es einen Nachtisch, den Sie empfehlen?</b> (Is there a dessert you recommend?) </li>
                                    <p>Answer: <b>"Was ist der empfohlene Nachtisch?"</b> (What is the recommended dessert?) </p>
                                </ul>

                                <p>Remember to be polite and thank the server after placing your order to show appreciation. With these steps, you can successfully order in German at a restaurant and enjoy your meal.</p>

                                <div className='alert alert-info'>
                                    Tip: Practice ordering in German by simulating restaurant scenarios. You can also practice with friends or family members to enhance your German ordering skills.
                                </div>
                            </div>


                        </>
                    );
                default:
                    return (
                        <>
                            <div className=''>
                                <p>The ability to order in German is crucial when dining in German-speaking environments.</p>
                                <p>When you place an order, tell the waiter what you would like.</p>
                                <img
                                    className='g-lesson-img float-end m-3 rounded'
                                    src="/images/Grammar/restaurant.jpg"
                                    alt="restaurant"
                                />
                                <ul>
                                    <li><b>Ich möchte eine Pizza, bitte. </b> (I would like a pizza, please.)</li>
                                </ul>

                                <p>Once you've placed your order, the server might ask you additional questions. You can also read some possible answers here:</p>
                                <ul>
                                    <li><b>Was für Beläge möchten Sie auf Ihrer Pizza?</b> (What toppings would you like on your pizza?)</li>
                                    <p>Answer: <b>"Ich hätte gerne Schinken und Champignons, bitte."</b> (I would like ham and mushrooms, please.)</p>

                                    <li><b>Welche Größe möchten Sie?</b> (What size would you like?) </li>
                                    <p>Answer: <b>"Ich möchte die mittlere Größe."</b> (I would like the medium size.)</p>

                                    <li><b>Möchten Sie etwas zu trinken?</b>(Would you like something to drink?) </li>
                                    <p>Answer: <b>"Ich hätte gerne eine Cola."</b> (I would like a cola.) </p>

                                    <li><b>Gibt es einen Nachtisch, den Sie empfehlen?</b> (Is there a dessert you recommend?) </li>
                                    <p>Answer: <b>"Was ist der empfohlene Nachtisch?"</b> (What is the recommended dessert?) </p>
                                </ul>

                                <p>Remember to be polite and thank the server after placing your order to show appreciation. With these steps, you can successfully order in German at a restaurant and enjoy your meal.</p>

                                <div className='alert alert-info'>
                                    Tip: Practice ordering in German by simulating restaurant scenarios. You can also practice with friends or family members to enhance your German ordering skills.
                                </div>
                            </div>


                        </>
                    );
            }
        }else{
            return (
                <>
                    <div className=''>
                        <p>The ability to order in German is crucial when dining in German-speaking environments.</p>
                        <p>When you place an order, tell the waiter what you would like.</p>
                        <img
                            className='g-lesson-img float-end m-3 rounded'
                            src="/images/Grammar/restaurant.jpg"
                            alt="restaurant"
                        />
                        <ul>
                            <li><b>Ich möchte eine Pizza, bitte. </b> (I would like a pizza, please.)</li>
                        </ul>

                        <p>Once you've placed your order, the server might ask you additional questions. You can also read some possible answers here:</p>
                        <ul>
                            <li><b>Was für Beläge möchten Sie auf Ihrer Pizza?</b> (What toppings would you like on your pizza?)</li>
                            <p>Answer: <b>"Ich hätte gerne Schinken und Champignons, bitte."</b> (I would like ham and mushrooms, please.)</p>

                            <li><b>Welche Größe möchten Sie?</b> (What size would you like?) </li>
                            <p>Answer: <b>"Ich möchte die mittlere Größe."</b> (I would like the medium size.)</p>

                            <li><b>Möchten Sie etwas zu trinken?</b>(Would you like something to drink?) </li>
                            <p>Answer: <b>"Ich hätte gerne eine Cola."</b> (I would like a cola.) </p>

                            <li><b>Gibt es einen Nachtisch, den Sie empfehlen?</b> (Is there a dessert you recommend?) </li>
                            <p>Answer: <b>"Was ist der empfohlene Nachtisch?"</b> (What is the recommended dessert?) </p>
                        </ul>

                        <p>Remember to be polite and thank the server after placing your order to show appreciation. With these steps, you can successfully order in German at a restaurant and enjoy your meal.</p>

                        <div className='alert alert-info'>
                            Tip: Practice ordering in German by simulating restaurant scenarios. You can also practice with friends or family members to enhance your German ordering skills.
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

export default RestaurantOrder;