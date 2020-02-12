import React, { PureComponent } from 'react'
import { 
    HomeWrapper,
    HomeRight,
    HomeLeft,
    BackTop
} from './style'
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writter from './components/Writter'
import { connect } from 'react-redux'
import { actionCreators } from './store'

class Home extends PureComponent {
    handleScrollTop() {
        window.scrollTo(0, 0)
    }
    render() {
        return(
            <HomeWrapper>
                <HomeLeft>
                    <img alt='img' className='banner-img' src='https://user-gold-cdn.xitu.io/2020/2/7/170204b94b4091d8?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1' />
                    <Topic />
                    <List />
                </HomeLeft>
                <HomeRight>
                    <Recommend />
                    <Writter />
                </HomeRight>
                {this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> : null}
            </HomeWrapper>
        )
    }
    componentDidMount () {
        this.props.changeHomeData();
        this.bindEvents()
    }
    componentWillUnmount () {
        window.removeEventListener('scroll', this.props.changeScrollTopShow)
    }
    bindEvents () {
        window.addEventListener('scroll', this.props.changeScrollTopShow)
    }
    
}

const mapDispatch = (dispatch) => ({
    changeHomeData() {
        dispatch(actionCreators.getHomeInfo())
    },
    changeScrollTopShow(e) {
        if(document.documentElement.scrollTop > 400) {
            dispatch(actionCreators.toggleTopShow(true))
        } else {
            dispatch(actionCreators.toggleTopShow(false))
        }
    }
})


const mapState = state => ({
    showScroll: state.getIn(['home', 'showScroll'])
})
export default connect(mapState, mapDispatch)(Home);