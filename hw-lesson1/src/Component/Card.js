import React from 'react'
import { createPicture } from '../service'


const like = (index) => {
  createPicture({ idPic: index.id, url: index.url, title: index.title, thumbnailUrl: index.thumbnailUrl });
}

export default function Card(props) {

  const { dat_a } = props;
  return (
    <>

      <div class="card" style="width: 18rem; display:inline-block">
        <img class="card-img-top" src={dat_a.url} alt="Card image cap" />
        <div class="card-body">
          <p class="card-text"><b>{dat_a.title}</b></p>
          <button class="btn btn-primary heartTop" onClick={like(dat_a)}><i class="fa fa-heart"><b>Like</b></i></button>
        </div>
      </div>
    </>
  )

}