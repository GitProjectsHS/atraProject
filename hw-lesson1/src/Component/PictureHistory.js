import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { actions } from '../Redux/Store/Actions'
import $ from 'jquery'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios'
import ImageUploading from 'react-images-uploading';
import ReactDOM from "react-dom";
import {Convert} from 'mongo-image-converter';
import { deletePicture } from '../service'


function mapStateToProps(state) {
  return {
    content: state.appReducer.content,
    user: state.userReducer.user
  };
}

const mapDispatchToProps = (dispatch) => ({
  setTitle: (title) => dispatch(actions.setTitle(title))
})

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  fabButton: {
    position: 'fixed',
    zIndex: 10,
    top: 10,
    left: 60,
    margin: '0 auto',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


export default connect(mapStateToProps, mapDispatchToProps)(function PictureHistory(props) {
  const { setTitle,user } = props;
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
  const classes = useStyles();
  useEffect(() => {
    setTitle("Pictures you chosen")
  }, []);

  useEffect(() => {
    get();
  }, []);
  async function deleteP(id) {
    await deletePicture({ id: user.userId, idPic: id });
    window.location.reload(true);
  }
  // $("body").on("click",".deleteBtn",function(){
  //   deleteP($(this).attr("data-obj"));
  // });
  async function get() {
    await axios.post('http://localhost:3500/getPicFromUser', user.userId).then(res => {
      if (res.data.myPic) {
        const array = res.data.myPic.pictures

        array.map(i => $("#cards").append(`<div class="card" style="width: 18rem; display:inline-block">
                <img class="card-img-top" src="${i.url}" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text"><b>${i.title}</b></p>
                  <button data-obj="${i._id}" class=" deleteBtn btn btn-primary deleteIcon" ${onclick = (e) => deleteP(e.target.dataset.obj)} ><i class="fa fa-trash"> <b> Delete</b></i></button>
                
                </div>
              </div>`))
      }
    }
      ,
      err => {
        console.log('error createUser: ' + err);
        return false;
      }
    )
  }
  
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col p-0">
          <div id="cards">
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              dataURLKey="data_url"
              maxNumber={maxNumber}
            >
              {({
                imageList,
                onImageUpload,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className="upload__image-wrapper">
                  <Fab color="secondary" aria-label="add" className={classes.fabButton}>
                    <AddIcon style={isDragging ? { color: 'red' } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    />
                  </Fab>
            &nbsp;

                  {imageList.map((image, index) => (

                    <div key={index} className="image-item">
                      <div class="card" id="mycard" >
                        <img class="card-img-top" src={image['data_url']} alt="" alt="Card image cap" />
                        <div class="card-body">
                          <p class="card-text"><b>baby picture</b></p>
                          <div className="image-item__btn-wrapper">
                            <button onClick={() => onImageRemove(index)} class="btn btn-primary deleteIcon"><i class="fa fa-trash"> <b> Delete</b></i></button>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </ImageUploading>

          </div>
        </div>
      </div>
    </div>

  );
})

