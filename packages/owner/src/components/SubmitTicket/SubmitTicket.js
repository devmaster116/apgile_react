import  { useEffect } from "react"
export default function SubmitTicket(props){
	

    useEffect(() => {
        window.open('https://apgile.freshdesk.com/support/tickets/new')
      setTimeout(() => {
        props.history.push('/dashboard')
      }, 500);
    }, [props.history])
    
	return []
	
}
