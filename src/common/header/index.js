import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import  { actionCreators } from './store'
import {actionCreators as loginActionCreators } from '../../pages/login/store'
import { Link } from 'react-router-dom'
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    Addtion,
    Button,
    SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    SearchInfoList
} from './style'

class Header extends Component {
    getListArea(show) {
        const { list, page, handleMouseEnter, handleMouseLeave, mouseIn, handleChangePage, totalPage } = this.props
        const newList = list.toJS()
        const pageList = []
        if(newList.length) {
            for(let i = (page - 1) * 10; i < page * 10; i ++) {
                pageList.push(
                    <SearchInfoItem key={newList[i]} >{ newList[i] }</SearchInfoItem>
                );
            } 
        }

        if (show || mouseIn) {
            return (
                <SearchInfo onMouseEnter={handleMouseEnter} 
                            onMouseLeave={handleMouseLeave}>
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}> 
                        <span ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe606;</span>
                        换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {
                            pageList
                        }
                    </SearchInfoList>
                </SearchInfo>
            )
        } else {
            return null
        }
    } 
    render() {
        const { focused, list, handleInputFocus, login, logout } = this.props
        return (
            <HeaderWrapper>
                <Link to="/">
                    <Logo></Logo>
                </Link>
                <Nav>
                    <NavItem className="left active">首页</NavItem>
                    <NavItem className="left">下载 APP</NavItem>
                    {
                        login ? <NavItem onClick={logout} className="right">退出</NavItem> : 
                        <Link to="/login"><NavItem className="right">登录</NavItem></Link>
                    }
                    <NavItem className="right">
                        <span className="iconfont">&#xe636;</span>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={ focused }
                            timeout={ 200 }
                            classNames="slide"
                        >
                            <NavSearch onFocus={ () => handleInputFocus(list) } onBlur={ this.props.handleInputBlur} className={ this.props.focused ? 'focused' : ''}></NavSearch>
                        </CSSTransition>
                        <span className={ focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe6dd;</span>
                        { this.getListArea(focused) }
                    </SearchWrapper>
                    <Addtion>
                        <Link to="/write">
                            <Button className="writting"><span className="iconfont">&#xe615;</span> 写文章</Button>
                            <Button className="reg">注册</Button>
                        </Link>
                    </Addtion>
                </Nav>
            </HeaderWrapper>
        )
    }
      
}

const mapStateToProps = (state) => {
    return {
        focused: state.get('header').get('focused'),
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        totalPage: state.getIn(['header', 'totalPage']),
        login: state.getIn(['login', 'login'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus (list) {
            if(list.size === 0) {
                dispatch(actionCreators.getList())
            }
            dispatch(actionCreators.searchFocus())
        },
        handleInputBlur () {
            dispatch(actionCreators.searchBlur())
        },
        handleMouseEnter() {
            dispatch(actionCreators.mouseEnter())
        },
        handleMouseLeave() {
            dispatch(actionCreators.mouseLeave())
        },
        handleChangePage(page, totalPage, spin) {
            let originAngle = spin.style.transform.replace(/[^0-9]/ig, '')

            spin.style.transform = 'rotate(360deg)'
            if(originAngle) {
                originAngle = parseInt(originAngle, 10)
            } else {
                originAngle = 0
            }
            spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';

            if(page < totalPage) { 
                dispatch(actionCreators.ChangePage(page + 1))
            } else {
                dispatch(actionCreators.ChangePage(1))
            }
        },
        logout() {
            dispatch(loginActionCreators.logout())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)