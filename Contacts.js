import React from 'react'
import Contact from './Contact';
import './style.css'
class Contacts extends React.Component {
    
    render() {
        return(
           <div className ='wrapper'>
               <h2>Contacts</h2>
               <Contact></Contact>
            </div>
        )
    }
}

export default Contacts
