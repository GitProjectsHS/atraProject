import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { actions } from '../Redux/Store/Actions'
// import Card from './Card'
import $ from 'jquery'
import { createPicture } from '../service'



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
  avatar: {
    backgroundColor: red[500],
  },
}));




export default connect(mapStateToProps, mapDispatchToProps)(function PictureList(props) {
  const { setTitle, user } = props;

  useEffect(() => {
    setTitle("List of pictures!!!")
  }, []);

  const userId = "602d62edf7fc27464040602f‏"
  async function like(e, index) {
    e.preventDefault()
    e.stopPropagation();
    //To do- change and add try/catch/then
    $.getJSON(`https://jsonplaceholder.typicode.com/photos/${index}`, function f(data) {
      createPicture({ id: user.userId, idPic: data.id, url: data.url, title: data.title, humbnailUrl: data.thumbnailUrl })
      console.log(data, 'dataaaaa')
    })
  }

  $.get("https://jsonplaceholder.typicode.com/photos", function f(data) {
    for (let i = 0; i < 100; i++) {
      $("#cards").append(` <div class="card" style="width: 18rem; display:inline-block">
    <img class="card-img-top" src="${data[i].url}" alt="Card image cap">
    <div class="card-body">
      <p class="card-text"><b>${data[i].title}</b></p>
       <button data-obj="${data[i].id}" class="likeBtn btn btn-primary heartTop"
         ${onclick = (e) => like(e, e.target.dataset.obj)}  ><i class="fa fa-heart" >
          <b> Like<b/></i></button>
    </div>
  </div>`)
    }
    //    <button data-obj="${data[i].id}" class="btn btn-primary heartTop" ${onclick=(e)=>like(e,e.target.dataset.obj)}><i class="fa fa-heart"><b> Like<b/></i></button>

    // ${onclick=(e)=>like(e,e.target.dataset.obj)}

    // <button id="${data[i].id}" class="btn btn-primary heartTop" ${onclick=(e)=>like(e.target.id)}><i class="fa fa-heart"><b> Like<b/></i></button>

    // content.pictures=newList;
    // console.log(dataP)
  })
  // const button = document.getElementsByClassName('likeBtn');

  // button.addEventListener('click', event => {
  //   //button.textContent = `Click count: ${event.detail}`;
  //   console.log(event,event.attr("data-obj"))
  // });
  // $("#likeBtn").on("click",".likeBtn",function(e){
  //   debugger
  //  e.preventDefault()
  //  e.stopPropagation();
  //  like($(this).attr("data-obj"));
  //   //console.log($this,$(this).attr("data-obj"));
  // });
  //"${onclick=()=> like(data[i])}"
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col p-0">
          <div id="cards">
            {/* {  content.pictures.forEach(element => {
             console.log(element)
            {<Card data={element}/>} 
           })} */}
          </div>

        </div>
      </div>
    </div>

  );
})
