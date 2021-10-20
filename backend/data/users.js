import bcrypt from 'bcryptjs';
const users=[
    {
        name:'Admin User',
        email:'admin@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Ravi Joshi',
        email:'Ravi@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false
        
    },
    {
        name:'Vinay Kumar',
        email:'Vinay@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:false
        
    }
]
 
export default users;