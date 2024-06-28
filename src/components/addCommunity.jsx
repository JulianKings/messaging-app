/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import useMultiRefs from "../scripts/helper/helper";
import CommunityBar from "./communityBar";
import '../style/addCommunity.css';
import { useEffect } from "react";

function AddCommunity()
{
    const navigate = useNavigate();
    const [inputs, addInput] = useMultiRefs();

    useEffect(() => {
        if(!localStorage.getItem('sso_token'))
        {
            navigate('/login');
        }
        
        const inputElements = inputs();
        inputElements.forEach((input) => {
            // register all Handlers
            if(input.getAttribute('data-change-event') !== 'true')
            {
                input.addEventListener("change", (event) => {
                    onInputChange(event, input, input.parentElement.nextElementSibling);
                });
                input.setAttribute('data-change-event', 'true');
            }      
        });
    }, []);

    return <>
        <CommunityBar />
        <div className="community-form">
            <div className="community-add-box">
                <form method="post" onSubmit={handleSubmit}>
                    <div className="form-holder">
                        <div className="form-title-holder">Create new community</div>
                        <div className="form-row">
                            <div className="form-input">
                                <div className="form-input-label"><label htmlFor="communityName">Community Name</label></div>
                                <div className="form-input-content"><input ref={addInput} type="text" id="communityName" name="community_name" maxLength="48" required /><span></span></div>
                                <div className="form-input-error"></div>
                            </div>
                            <div className="form-input">
                                <div className="form-input-label"><label htmlFor="communityDescription">Community Description</label></div>
                                <div className="form-input-content"><input ref={addInput} type="text" id="communityDescription" name="community_description" maxLength="128" required /><span></span></div>
                                <div className="form-input-error"></div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-input">
                                <div className="form-input-label"><label htmlFor="communityPicture">Community profile picture (URL)</label></div>
                                <div className="form-input-content"><input ref={addInput} type="text" id="communityPicture" name="community_picture" minLength="1" maxLength="256" /><span></span></div>
                                <div className="form-input-error"></div>
                            </div>
                            <div className="form-input">
                                <div className="form-input-label"><label htmlFor="communityStatus">Community Status</label></div>
                                <div className="form-input-content">
                                    <select ref={addInput} id="communityStatus" name="community_status" defaultValue={'public'} required>
                                        <option value='public'>Public</option>
                                        <option value='private'>Private</option>
                                    </select></div>
                                <div className="form-input-error"></div>
                            </div>
                        </div>
                        <div className='form-row'>
                            <button type='submit'>Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>

    // Handlers
    function handleSubmit(event)
    {
        event.preventDefault();
        const user = {};
        let errorNoticed = false;
        const inputElements = inputs();

        inputElements.forEach((input) => {
            if(input.classList.contains('error'))
            {
                errorNoticed = true;
            } else {
                user[input.id] = input.value;
            }
        });

        if(!errorNoticed && localStorage.getItem('sso_token'))
        {
            // ask the backEnd
            fetch("http://localhost:3000/sso/add_community", { 
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + localStorage.getItem('sso_token')},
                mode: "cors",
                dataType: 'json',
                body: JSON.stringify(user),
            })
            .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
            })
            .then((response) => {
                if(response.responseStatus)
                {
                    if(response.responseStatus === 'validAppendCommunity')
                    {
                        navigate('/');
                    } else {
                        console.log(response.errors);
                        response.errors.forEach((error) => {
                            const result = inputElements.find((input) => {
                                if(input.id === error.path)
                                {
                                    return input;
                                }
                            })

                            if(result)
                            {                    
                                if(result.classList.contains("valid"))
                                {
                                    result.classList.remove("valid");
                                }       
                                result.classList.add("error");
                                result.parentElement.nextElementSibling.textContent = error.msg;
                            }
                        });
                    }
                }            
            })
            .catch((error) => {
                throw new Error(error);
            });
        }
    }

    function onInputChange(inputEvent, input, prevSibling)
    {
        let inputValue = inputEvent.target.value;

        // apply/remove required flag
        if(input.getAttribute("required") !== null && inputValue !== undefined 
        && inputValue !== "")
        {
            input.setAttribute("wasRequired", true);
            input.removeAttribute("required");
        } else if(input.getAttribute("wasRequired") !== null && inputValue === undefined ||
        input.getAttribute("wasRequired") !== null && inputValue === "")
        {
            input.setAttribute("required", "");
            input.removeAttribute("wasRequired");
        }

        //clean up
        if(input.classList.contains("error"))
        {
            input.classList.remove("error");
            // cleanup error notif
            prevSibling.textContent = "";
        }

        if(input.classList.contains("valid"))
        {
            input.classList.remove("valid");
        }

        if(inputValue !== undefined && inputValue !== "")
        {
            // Handle each input
            if(input.id === "communityName")
            {
                // Handle names and inform of any errors
                if(inputValue.length < 3) {
                    input.classList.add("error");
                    prevSibling.textContent = "Community name minimum length is 3 characters";
                } else {
                    input.classList.add("valid");
                }
            } else if(input.id === "communityDescription")
            {
                if(inputValue.length < 3) {
                    input.classList.add("error");
                    prevSibling.textContent = "Community description minimum length is 3 characters";
                } else {
                    input.classList.add("valid");
                }
            }
        }
    }
}

export default AddCommunity;