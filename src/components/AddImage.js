import React, { useRef } from 'react'
import toast from 'react-hot-toast'

const AddImage = () => {

  const labelRef = useRef(null)
  const imageUrlRef = useRef(null)

  const addImage = async (e) => {
    await fetch("http://localhost:5000/addImage", {
      method: "POST",
      body: JSON.stringify({
        label: labelRef.current.value,
        imageUrl: imageUrlRef.current.value
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        toast("Image Added...")
        cancelAddImage(e)
      })
      .catch(err => {
        toast("Error...")
        console.log(err)
      })
  }

  const cancelAddImage = (e) => {
    // hide overlay and add image form
    e.preventDefault()
    e.stopPropagation()

    const body = document.querySelector("body")
    const overlay = document.querySelector(".overlay")

    body.style.overflow = "visible"
    overlay.style.display = "none"
  }

  return (
    <>
      <h2>Add a new photo</h2>
      <form onSubmit={(e) => addImage(e)}>
        <div className="mb-3">
          <label htmlFor="label" className="form-label">Label</label>
          <input type="text" className="form-control" id="label" aria-describedby="image label"
            placeholder='e.g. car, wild ...' name="label"
            ref={labelRef} />
        </div>
        <div className="mb-3">
          <label htmlFor="photoUrl" className="form-label">Photo URL</label>
          <input type="text" className="form-control" id="photoUrl" placeholder='e.g. https://source.unsplash.com/random/'
            name="photoUrl"
            ref={imageUrlRef} />
        </div>
        <div className="btn-holder d-flex justify-content-end">
          <button className="btn btn-light me-2"
            onClick={(e) => cancelAddImage(e)}>Cancel</button>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </>
  )
}

export default AddImage
