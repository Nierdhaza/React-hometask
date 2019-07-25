import React from 'react'
import './style.css'
import axios from 'axios'


class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            searchString: '',
            isOpen: true,
            userFirstName: '',
            userSecondName: '',
            userPhoneNumber: '',
            image: null
        }
    }
    componentDidMount() {
        axios.get('https://randomuser.me/api?results=20&inc=name,phone,email')
        .then((Response) => {
            // console.log(Response.data.results);
            this.setState({
                users: Response.data.results
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    switchPage = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    getUserInfo = (i) => {
        for (let i = 0; i <= this.state.users.length; i++) {
        }
        this.setState({
            isOpen: !this.state.isOpen,
            userFirstName: this.state.users[i].name.first,
            userSecondName: this.state.users[i].name.last,
            userPhoneNumber: this.state.users[i].phone
        })
    }

    searchUsers = (event) => { 
        this.setState({
            searchString: event.target.value
        })
      } 

    //   Work with new user

    
    onChangeName = (event) => {
        this.setState({
            userFirstName: event.target.value
        })
    } 

    onChangeSurname = (event) => {
        this.setState({
            userSecondName: event.target.value
        })
    }

    onChangePhone = (event) => {
        this.setState({
            userPhoneNumber: event.target.value
        })
    }


    onSubmit = (event) => {
        let obj = {
            name: {
                first: this.state.userFirstName,
                last: this.state.userSecondName
            },
            phone: this.state.userPhoneNumber,
            img: this.state.image
        }
        this.state.users.push(obj);
        console.log(this.state.users);
        alert('New User added!!');
        event.preventDefault();
    }
    
    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.setState({image: e.target.result});
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      }


      render() {
        let names = this.state.users.filter(e => e.name.first.startsWith(this.state.searchString));
        const filtered = names.map((element,index) => <div key = {index} className = 'element'>{element.name.first} <button onClick = {() => this.getUserInfo(index)}>User Info</button></div>);
        const body = 
        this.state.isOpen ? 
        <div>
            <input type="text" value = {this.state.searchString} onChange = {this.searchUsers} placeholder="Search" className = "bordered"/>
            <div className = 'btnwrap'><button className= 'btn' onClick = {this.switchPage}> <img src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/add-64.png" alt="logo"/></button></div>
            {filtered}
            </div> : 
                <div className = 'newUser' > 
                    <div className = 'photo'><img src = {this.state.image} alt = "userlogo"/> </div ><label className = 'add'> Photo <input type = "file" className = 'add' onChange={this.onImageChange}/></label>
                    <div className = 'data'>
                        <form onSubmit = {this.onSubmit}>
                            <label> First name: <input type="text" placeholder = 'Name' name = "firsName" value = {this.state.userFirstName} onChange = {this.onChangeName}/></label>
                            <label>Surname: <input type="text" placeholder = 'Surname' name = "surName"  value = {this.state.userSecondName} onChange = {this.onChangeSurname}/></label>
                            <label>Phone number: <input type="text" placeholder = 'Phone' name = "phoneNumber" value = {this.state.userPhoneNumber} onChange = {this.onChangePhone}/></label>
                            <input type="submit" value = "Save user"/>
                        </form>
                    </div>
                    <div className = 'options'> 
                        <button onClick = {this.switchPage}>Cancel</button>
                    </div>
                </div>
        return(
        body
        )
    }
}
export default Contact;