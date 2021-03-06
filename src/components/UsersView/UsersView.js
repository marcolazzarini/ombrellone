import React, { useState, useEffect } from 'react';
import database from '../../firebase'
import Grid from '../../Grid'
import UserCard from '../UserCard/UserCard'
import * as Styles from './styles'
const UsersView = () => {
    const [users, setUsers] = useState(null);
    const [data, setData] = useState(null);

    const sortFn = (user1, user2) => {
        if (user1.value > user2.value) return 1;
        if (user2.value > user1.value) return -1;
        return 0;
    };

    useEffect(() => {
        database.child('users').on('value', snapshot => {
            setUsers(snapshot.val());
        });
        database.child('consumazioni').on('value', snapshot => {
            setData(snapshot.val());
        });
    }, []);

    if (!users || !data) return <div />;

    const usersWithData = users.map(user => ({ ...user, value: data[user.id] })).sort(sortFn)
    return (
        <Styles.AppContainer>
            <h1><span role="img" aria-label="palma">🌴</span>Ombrellone App<span role="img" aria-label="drink">🍹</span></h1>
            <Grid.Container>
                { usersWithData.map((userData, index) => (
                        <Grid.Row key={index}>
                            <Grid.Col>
                                <UserCard key={index} { ...userData} />
                            </Grid.Col>
                        </Grid.Row>
                    )
                )}
            </Grid.Container>
        </Styles.AppContainer>
    )

};

export default UsersView;
