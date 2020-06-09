import React, { useState, useEffect } from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import moment from 'moment'
import * as Styles from './styles'
import database from '../../firebase'


const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);
const UserCard = props => {
    const [expenseValue, setExpenseValue] = useState('');
    const [entries, setEntries] = useState([]);
    const [userEntries, setUserEntries] = useState([]);
    const [bodyOpened, setBodyOpened] = useState(false);
    const [addExpense, setAddExpense] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const { img, id, value, max } = props;

    const userDataRef = database.child('consumazioni').child(id)
    const entriesRef = database.child('entries');

    const sortFn = (entry1, entry2) => {
        if (entry1.millis > entry2.millis) return -1;
        if (entry2.millis > entry1.millis) return 1;
        return 0;
    };

    useEffect(() => {
        database.child('entries').on('value', snapshot => {
            setEntries(snapshot.val());

            let userEntries = snapshot.val().filter(entry => entry.user === id);
            userEntries = userEntries.sort(sortFn);
            setUserEntries(userEntries)
        });
    }, [id]);

    const pay = () => {
        userDataRef.set(value-expenseValue);
        let updatedEntries = [ ...entries, { millis: new Date().getTime(), user: id, value: expenseValue } ];
        entriesRef.set(updatedEntries);

        setExpenseValue(0);
        setAddExpense(false);
        setBodyOpened(false);
    };

    const computeColor = value => value >=20 ? '#265FFF' : (value <= 8 ? '#DA0A16' : '#B18900');

    const computeProgressStyles = () => buildStyles({
            strokeLinecap: 'butt',
            pathTransitionDuration: 0.5,
            pathColor: computeColor(value),
            trailColor: '#434343'
        });

    const emojiByUser = user => {
        switch (user) {
            case 'lazza': return <span role="img" aria-label="whale">🐳</span>;
            case 'seba': return <span role="img" aria-label="dragon">🐲</span>;
            case 'dario': return <span role="img" aria-label="trex">🦖</span>;
            case 'ricky': return <span role="img" aria-label="shuttle">🚀</span>;
            case 'teo': return <span role="img" aria-label="frog">🐸</span>;
            case 'nico': return <span role="img" aria-label="snake">🐍</span>;
            case 'tara': return <span role="img" aria-label="snake">👨🏽‍🔧</span>;
            default: return <span role="img" aria-label="sun">☀️</span>;
        }
    };

    const handlePayClick = () => {
        setShowHistory(false);

        if (addExpense) {
            setBodyOpened(false);
            setAddExpense(false);
        } else {
            if (!bodyOpened) setBodyOpened(true);
            setAddExpense(true);
        }
    };

    const handleHistoryClick = () => {
        setAddExpense(false);
        if (showHistory) {
            setBodyOpened(false);
            setShowHistory(false);
        } else {
            if (!bodyOpened) setBodyOpened(true);
            setShowHistory(true);
        }
    };

    return (
        <Styles.UserCard>
            <Styles.Header>
                <Styles.AvatarWithProgress>
                    <CircularProgressbarWithChildren value={value} minValue={0} maxValue={max} counterClockwise={true} styles={computeProgressStyles()}>
                        <Styles.Avatar>
                            <img src={process.env.PUBLIC_URL + '/images/' + id + '.png'} alt={id} width={56}/>
                        </Styles.Avatar>
                    </CircularProgressbarWithChildren>
                </Styles.AvatarWithProgress>
                <Styles.UserInfo>
                    <Styles.User>{emojiByUser(id)}&nbsp;{ capitalize(id) }</Styles.User>
                    <Styles.LeftValue color={computeColor(value)}>€ {value}</Styles.LeftValue>
                    <Styles.Action onClick={handlePayClick}><h2><span role="img" aria-label="sun">💸️</span></h2></Styles.Action>
                    <Styles.Action onClick={handleHistoryClick}><h2><span role="img" aria-label="sun">🗓</span></h2></Styles.Action>
                </Styles.UserInfo>
            </Styles.Header>
            <Styles.Body opened={bodyOpened}>
                { addExpense && (
                    <>
                        <Styles.InputContainer>
                            <Styles.UDM>€</Styles.UDM>
                            <Styles.Input type="number" autoFocus value={expenseValue} onChange={event => setExpenseValue(event.target.value)} />
                        </Styles.InputContainer>
                        <Styles.Button type="button" onClick={pay}><span role="img" aria-label="whale">🍺</span>&nbsp;Paga</Styles.Button>
                    </>
                )}
                {
                    showHistory && (
                        <Styles.History>
                            <Styles.HistoryTitle>Storico</Styles.HistoryTitle>
                            { userEntries.map(entry => (
                                <Styles.DataEntry>
                                    <Styles.Time>{ moment(entry.millis).format('DD MMM YYYY, HH:mm') }</Styles.Time>
                                    <Styles.Value>€ &nbsp;{ entry.value }</Styles.Value>
                                </Styles.DataEntry>)
                            )}
                        </Styles.History>
                    )
                }
            </Styles.Body>
        </Styles.UserCard>
    )
};

export default UserCard;