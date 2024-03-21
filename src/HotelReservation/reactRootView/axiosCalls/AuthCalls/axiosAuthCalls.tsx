import axios from "axios";
import axiosCalls from "../axiosCalls"
import SignUpObj from "../../interfaces/Auth/ISignUpInterface"

export default {
    postSignUpCall: (dto: SignUpObj) =>
    (
        axios({
            method: 'post',
            url: `${axiosCalls.baseUrl}/Auth/Register`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: dto
          })
          // .then((response) => {
          //   console.log("response: ", response.data)
          // })
    )
}
