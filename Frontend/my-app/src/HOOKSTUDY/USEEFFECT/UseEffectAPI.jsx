import React, { useEffect, useState } from "react";

const UseEffectAPI = () => {
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        const response = await fetch("https://api.git.com/users")
        setUsers(await response.json());


    }
    useEffect(() => {
        getUsers();

    }, []);
    return (
        <>
            <h1>List of GitHub Users </h1>
            <div className="Container">

                <div className=" card-fluid mt-5">
                    <div className="row text-center">
                        {
                            users.map((curElem) => {
                                return (
                                    <div>
                                        <div className="col-10 col-md-4 mt-5">
                                            <div class="card p-2">
                                                <div class="d-flex align-item-center">
                                                    <div class="img">
                                                        <img src="" class="rounded" width="155" alt="" />
                                                        <div class="ml-3 w-100">
                                                            <h4 class="mb-0 mt-0 textLeft">Ankit Kumar</h4><span className="textLeft">Man Devloper</span>
                                                            <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                                                <div class="d-flex flex-column"><span class="articles">Articles</span><span class="number1">38</span>
                                                                    <div class="d-flex flex-column"><span class="followers">Followers</span><span class="number2">900</span>
                                                                        <div class="d-flex flex-column"><span class="rating">Rating</span><span class="number3">8.9</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>

            </div>
        </>
    )
}
export default UseEffectAPI