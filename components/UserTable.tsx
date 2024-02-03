import React from 'react';
import styles from '../styles/styles.module.css';

export interface User {
  id: string;
  avatar: string;
  birthdate: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  subscription: string;
  createdAt: string;
}

export interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({users}) => {
    return (
        <div className={styles['table-container']}>
            <table className={styles['table']}>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Subscription</th>
                        <th>Birthdate</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((
                        {
                            id,
                            avatar,
                            birthdate,
                            email,
                            firstName,
                            lastName,
                            age,
                            gender,
                            subscription,
                            createdAt
                        }
                    ) => {
                        const newBirth = new Date(birthdate);
                        const newCreated = new Date(createdAt);
                        const format = (number) => number.toString().length === 1 ? `0${number}` : number;

                        const birthMonth = (newBirth.getUTCMonth() + 1).toString();
                        const birthYear = newBirth.getUTCFullYear().toString().slice(2);
                        const birthDate = `${format(newBirth.getUTCDate())}.${format(birthMonth)}.${birthYear}`

                        const createdMonth = (newCreated.getUTCMonth() + 1).toString();
                        const createdYear = newCreated.getUTCFullYear().toString().slice(2);
                        const created = `${format(newCreated.getUTCDate())}.${format(createdMonth)}.${createdYear}`;

                        return(
                            <tr key={id}>
                                <td>
                                    <img
                                        src={avatar}
                                        alt={`${firstName} ${lastName}`}
                                        className={styles['avatar']}
                                    />
                                </td>
                                <td>{firstName}</td>
                                <td>{lastName}</td>
                                <td>{email}</td>
                                <td>{age}</td>
                                <td>{gender}</td>
                                <td>{subscription}</td>
                                <td>{birthDate}</td>
                                <td>{created}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
