import React from "react";

import './UsersList.css'
import UserItem from "./UserItem";
import Card from "../../Shared/Components/UIElements/Card";

const UsersList =props =>{
    if (props.items.length === 0){
        return (
            <div className="center">
            <Card className="user-item__content">
            <h1> No users Found</h1>
            </Card>
            </div>
        );
    }
    return(
    <ul className='users-list'>
        {props.items.map(user=>(
        <UserItem 
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places.length}
        />
        ))}
    </ul>
    );
}



export default UsersList;