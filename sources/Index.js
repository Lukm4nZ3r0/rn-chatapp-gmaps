import Auth from './components/Auth'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Chat from './components/Chat'
import Maps from './components/Maps'
import ChatList from './components/ChatList'
import ProfileScreen from './components/ProfileScreen'
import EditProfile from './components/EditProfile'
// import DrawerCustom from './components/DrawerCustom'
import { createDrawerNavigator,createAppContainer, createStackNavigator } from 'react-navigation'

const AppNavigator = createStackNavigator({
    Auth:{ screen:Auth },
    Home:{ screen:Home },
    EditProfile: { screen:EditProfile },
    Login:{ screen:Login },
    Register:{ screen:Register },
    Chat: { screen:Chat },
    Maps: { screen:Maps },
    ChatList: { screen:ChatList },
    ProfileScreen: { screen:ProfileScreen },
})

// const IndexNavigator = createDrawerNavigator(
//     {
//         Auth:{ screen: AppNavigator }
//     },
//     {
//         contentComponent: DrawerCustom
//     }
// )

const Index = createAppContainer(AppNavigator)

export default Index