import React, { Component, Fragment } from 'react';
import HomeComponent from '../component/HomeComponent'
import storage from '../services/storageService'

class HomeContainer extends Component {

    constructor(props) {
        super(props);
        this.renderBlock = this.renderBlock.bind(this);
        this.drag = this.drag.bind(this);
        this.drop = this.drop.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.swap = this.swap.bind(this)
        // initialize data for blocks
        this.state = {
            targetbox: null,
            blocks: [{
                    id: 1,
                    imagePreviewUrl: ''
                },
                {
                    id: 2,
                    imagePreviewUrl: ''
                },
                {
                    id: 3,
                    imagePreviewUrl: ''
                },
                {
                    id: 4,
                    imagePreviewUrl: ''
                },
                {
                    id: 5,
                    imagePreviewUrl: ''
                },
                {
                    id: 6,
                    imagePreviewUrl: ''
                },
                {
                    id: 7,
                    imagePreviewUrl: ''
                },
                {
                    id: 8,
                    imagePreviewUrl: ''
                }
            ]
        }
    }


    // swapping two blocks data
    swap(id1, id2) {
        
        let pos2 = this.state.blocks.findIndex((object) => { return ('block-' + object.id === id2) })
        let pos1 = this.state.blocks.findIndex((object) => { return ('block-' + object.id === id1) })
        let tempArray = this.state.blocks
        let temp = this.state.blocks[pos1]
        tempArray[pos1] = this.state.blocks[pos2]
        tempArray[pos2] = temp
        try {
            storage.setSessionItem('blocks', JSON.stringify(tempArray));

        } catch (e) {
            alert('Oops! Sessionstorage is full. Try empty it.')
        }
        this.setState({ blocks: tempArray })
    }

    // preventing default functionality so to drop on element
    drag(event) {
        event.preventDefault()
    }

    dragEnd(event) {
        this.setState({targetbox: null});
    }

    dragStart(event) {
        event.dataTransfer.setData("text", event.currentTarget.id);
        this.setState({targetbox: true});
    }

    // drop element
    drop(event) {
        if (event.currentTarget.id) {
            this.swap(event.dataTransfer.getData("text"), event.currentTarget.id)
            event.dataTransfer.clearData()
        }
    }

    componentDidMount() {
        // Checking for data in Session storage
        let storageBlocks = JSON.parse(storage.getSessionItem('blocks'));
        if (storageBlocks) {
            const blocks = storageBlocks;
            this.setState({
                blocks,
            });
        }
    }

    // rendering blocks
    renderBlock(ele, index) {
      let storageBlocks = JSON.parse(storage.getSessionItem('blocks'));
      let imagePreviewUrl = ele.imagePreviewUrl;
      if (storageBlocks && storageBlocks[index].imagePreviewUrl !== '') {
          imagePreviewUrl = storageBlocks[index].imagePreviewUrl
      }

      let style = {opacity: 1}
       if (this.state.targetbox === null) {
           style = {opacity: 1}
       }
       else{
        style = {opacity: 0.5, transition: 'all 0.2 ease'}
       }

      return (
        <HomeComponent
          id={ele.id}
          index={index}
          style={style}
          imagePreviewUrl={imagePreviewUrl}
          drop={this.drop}
          dragStart={this.dragStart}
          dragEnd={this.dragEnd}
          drag={this.drag}
          handleImageChange={(e) => this.handleImageChange(e, index)}
          key={index}
        >
        </HomeComponent>
       
      )
    }

    handleImageChange(e, index) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file.size > 1048576) {
            alert('Oops! File is too big or file type is not correct. Please try again')
        } else {
          // checkoing on load of file
            reader.onloadend = () => {
                const blocks = this.state.blocks;
                blocks[index].imagePreviewUrl = reader.result;
                // maintaining storage for data
                try {
                    storage.setSessionItem('blocks', JSON.stringify(this.state.blocks));

                } catch (e) {
                    alert('Oops! Sessionstorage is full. Try empty it.')
                }

                // update state
                this.setState({
                    blocks,
                });
            }
            reader.readAsDataURL(file);
        }
    }

    render() {
        return (
            <Fragment>
              <div className="row">
                {/*render data*/}
                {this.state.blocks.map(this.renderBlock)}
              </div>
          </Fragment>
        )
    }
}

export default HomeContainer;
