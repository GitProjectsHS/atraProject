import React, { useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { actions } from '../Redux/Store/Actions'
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

  async function like(e, index) {
    e.preventDefault()
    e.stopPropagation();
    $.getJSON(`https://jsonplaceholder.typicode.com/photos/${index}`, function f(data) {
    createPicture({ id: user.userId, idPic: data.id, url: data.url, title: data.title, humbnailUrl: data.thumbnailUrl })
    })
  }

  $.get("https://jsonplaceholder.typicode.com/photos", function f(data) {
    for (let i = 0; i < 100; i++) {
      $("#cards").append(` <div class="card" style="width: 18rem; display:inline-block">
    <img class="card-img-top" src="${data[i].url}" alt="Card image cap">
    <div class="card-body">
      <p class="card-text"><b>${data[i].title}</b></p>
       <button data-obj="${data[i].id}" class="likeBtn btn btn-primary heartTop"
       ${onclick = (e) => like(e, e.target.dataset.obj)}
><i class="fa fa-heart" >
          <b> Like<b/></i></button>
    </div>
  </div>`)
    }
  })

  // $("#likeBtn").on("click",".likeBtn",function(e){
  //  e.preventDefault()
  //  e.stopPropagation();
  //  like($(this).attr("data-obj"));
  // });
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col p-0">
          <div id="cards">
          </div>

        </div>
      </div>
    </div>

  );
})
