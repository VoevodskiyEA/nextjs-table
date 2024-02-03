import React from 'react';
import styles from '../styles/styles.module.css';
import {User} from "@/components/UserTable";

interface CardViewTableProps {
  users: User[];
}

const CardViewTable: React.FC<CardViewTableProps> = ({ users }) => {
  return (
    <div className={`${styles['table-container']} ${styles['card-container']}`}>
      {users.map((user) => (
        <div key={user.id} className={styles['card']}>
          <img className={styles['avatar']} src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
          <div className={styles['cardContent']}>
            <h3>{`${user.firstName} ${user.lastName}`}</h3>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardViewTable;
