import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function New() {
    const [inputs, setInputs] = useState({});
    const [redirect, setRedirect] = useState(false);

    function handleInputChange(event) {

    }

    function handleSubmit(event) {

    }

    if (redirect) {
        return <Redirect to="/blogs" />;
    }

    return (
        <div className="container">
            <header>
                <h1>New Blog Post</h1>
            </header>

            <div>
                <form action="/api/blogs" method="post" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input className="form-control" name="title" required onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Content</label>
                        <input className="form-control" name="content" required onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select className="form-control" name="status" required onChange={handleInputChange}>
                            <option value="DRAFT">draft</option>
                            <option value="PUBLISHED">published</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-dark" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default New;