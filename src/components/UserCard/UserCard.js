import React, { useState } from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import * as Styles from './styles'
import database from '../../firebase'


const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);
const UserCard = props => {
    const [expenseValue, setExpenseValue] = useState('');
    const [addExpenseOpened, setAddExpenseOpened] = useState(false);
    const { img, id, value, max } = props;

    const dataRef = database.child('consumazioni').child(id)

    const pay = () => {
        dataRef.set(value-expenseValue);
        setExpenseValue(0);
        setAddExpenseOpened(false);
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

    return (
        <Styles.UserCard>
            <Styles.Header onClick={() => setAddExpenseOpened(!addExpenseOpened)}>
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
                </Styles.UserInfo>
            </Styles.Header>
            <Styles.Body opened={addExpenseOpened}>
                <Styles.InputContainer>
                    <Styles.UDM>€</Styles.UDM>
                    <Styles.Input type="number" autoFocus value={expenseValue} onChange={event => setExpenseValue(event.target.value)} />
                </Styles.InputContainer>
                <Styles.Button type="button" onClick={pay}><span role="img" aria-label="whale">🍺</span>&nbsp;Paga</Styles.Button>
            </Styles.Body>
        </Styles.UserCard>
    )
};

export default UserCard;