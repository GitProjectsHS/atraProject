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
// import ReactDOM from "react-dom";
// import {Convert} from 'mongo-image-converter';
import { deletePicture } from '../service'


function mapStateToProps(state) {
  return {
    content: state.appReducer.content
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
  const { setTitle } = props;
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const classes = useStyles();
  useEffect(() => {
    setTitle("Pictures you chosen")
  }, []);


  //=============================function convert==========================
  // const convertImage = async (event) => {
  //   try {
  //   const convertedImage = await Convert(imageFile)
  //   if( convertedImage ){
  //   console.log(convertedImage);
  //   } else{
  //       console.log('The file is not in format of image/jpeg or image/png')
  //   }
  // } 
  // catch (error) {
  //   console.warn(error.message)
  //   }
  // }
  //------------------------------------------get-pictures-------------------------------
  async function deleteP(id) {
    deletePicture({ id: '602d6da9cbf75848188a2a5d', idPic: id });
  }
  // $("body").on("click",".deleteBtn",function(){
  //   debugger
  //   deleteP($(this).attr("data-obj"));
  // });
  async function get() {
    const userId = "602d62edf7fc27464040602f‏"
    await axios.post('http://localhost:3500/getPicFromUser', userId).then(res => {
      //  console.log('getPicFromUser work ' + JSON.stringify(res.data));
      if (res.data.myPic) {
        debugger
        const array = res.data.myPic.pictures

        console.log("reeeeeeeeeeeeeeeeesssssssss", res.data.myPic, array)
        // return "data is null";
        array.map(i => $("#cards").append(`<div class="card" style="width: 18rem; display:inline-block">
                <img class="card-img-top" src="${i.url}" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text"><b>${i.title}</b></p>
                  <button data-obj="${i._id}" class=" deleteBtn btn btn-primary deleteIcon" ${onclick = (e) => deleteP(e.target.dataset.obj)} ><i class="fa fa-trash"> <b> Delete</b></i></button>
                
                </div>
              </div>`))
      }
    }
      // ${onclick=(e)=>deleteP(e.target.dataset.obj)}
      ,
      err => {
        console.log('error createUser: ' + err);
        return false;
      }
    )
  }
  useEffect(() => {
    get();
  }, []);
  //------------------------------------------end-get-pictures---------------------------

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col p-0">
          <div id="cards">
            {/* // ----------------------------image------------------------ */}
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
                // write your building UI
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
                      {console.log(image)}

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

  //   $.get("https://jsonplaceholder.typicode.com/photos", function f(data){
  //     let i;
  //     for(i=0;i<100;i++){
  //     // console.log(data[i])
  //     $("#cards").append(`<div class="card" style="width: 18rem; display:inline-block">
  //     <img class="card-img-top" src="${data[i].url}" alt="Card image cap">
  //     <div class="card-body">
  //       <p class="card-text"><b>${data[i].title}</b></p>
  //       <button class="btn btn-primary deleteIcon"><i class="fa fa-trash"> <b> Delete</b></i></button>
  //     </div>
  //   </div>`)


  //     }
  // // console.log(data)
  // })   
  // $('.deleteBtn').on('onClick',function(){
  //   debugger
  //   console.log('indelettttttteeee')
  //   deleteP($(this).attr("data-obj"))
  // })
  // $('.deleteBtn').on('Click',function(){
  //      //debugger
  //      alert($(this).attr("data-obj"));
  // });