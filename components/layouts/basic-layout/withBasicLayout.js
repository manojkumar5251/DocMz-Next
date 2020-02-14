import Head from 'next/head'
import {compose} from "redux";
import { connect } from 'react-redux'
import { PROJECT_NAME, GOOGLE_API_KEY } from '../../../constants/projectKeys'
import { mainMenus } from "../../../constants/messages/menus"
import Header from '../../header/Header'
import '../../../style/app.scss'
import { getSpecialities } from '../../../redux/actions'
import Footer from '../../footer/Footer';

const withBasicLayout = (PassedComponent) => {
    return class extends React.Component {
        componentDidMount(){
            this.props.getSpecialities()
        }
        render(){
            const {
                children,
                ...props
            } = this.props
            return (
                <div className="c-layout c-layout--basic">
                    <Head>
                        <title>{PROJECT_NAME}</title>
                        <link rel="icon" href="/favicon.png" />
                    </Head>
                    <script src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`} async defer></script>
                    <Header mainMenus={mainMenus} />
                    <PassedComponent {...props} >{children}</PassedComponent>
                    <Footer />
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    specialities: state.specialities
})
const mapActionToProps = {
    getSpecialities
}
export default compose(connect(mapStateToProps, mapActionToProps), withBasicLayout)