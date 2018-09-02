import React, { Component } from 'react';

class HomeComponent extends Component {

    render() {
      // render each data block
        return (
          <div style= {this.props.style}  className="col-xs-12 col-sm-6 col-md-3" 
	          id={`div-${this.props.id}`}
	          onDragOver={(e) => this.props.drag(e)}
	        >
          <div  className="card" 
            id={`block-${this.props.id}`} 
            draggable="true" 
            onDrop={(e) => this.props.drop(e)} 
            onDragStart={(e) => this.props.dragStart(e)} 
            onDragOver={(event) => event.preventDefault()}
            onDragEnd={() => this.props.dragEnd()}
          >
          {/*upload image*/}
            <form >
              <input 
              className='file' 
              type="file" 
              onChange={(e)=>this.props.handleImageChange(e, this.props.index)} />
            </form>

            {/*render image*/}
            <div className="img-preview" style={{'backgroundImage': `url(${this.props.imagePreviewUrl})`}}></div>
          </div>
        </div>
      )
    }
}

export default HomeComponent;
