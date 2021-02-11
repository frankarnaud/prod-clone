import React from 'react'
import ProjectList from './ProjectList';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component'
import { getDate } from '../../../utils/appUtils'


function LeftConfent({user}){
    let [projectListIndex, setProjectListIndex] = React.useState(10)

    const handleNext = () => {
        setProjectListIndex(projectListIndex + 1)
    }
    
    return (
        <React.Fragment>
            <InfiniteScroll hasMore={true} dataLength={projectListIndex} next={handleNext} >
            
            {Array.from({length: projectListIndex}).map((_,index) =>(
                    <ProjectList key={index} date={getDate(index)} prodNumber={index + 1}/>
                ))}
            </InfiniteScroll>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(LeftConfent)