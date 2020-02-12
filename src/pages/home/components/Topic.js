import React, { PureComponent } from 'react'
import { TopicWrapper, TopicItem } from '../style'
import { connect } from 'react-redux'
class Topic extends PureComponent {
    render() {
        const { list } = this.props
        return(
            <TopicWrapper>
                {
                    list.map( item => 
                        <TopicItem key={item.get('id')}>
                            <img className="topic-pic"alt="img" src={ item.get('imgUrl') }/>
                            { item.get('title') }
                        </TopicItem>
                    )
                }
            </TopicWrapper>
        )
    }
}

const mapState = state => ({
    list: state.get('home').get('topicList')
})

export default connect(mapState, null)(Topic);