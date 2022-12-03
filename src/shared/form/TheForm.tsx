import React,{ReactElement} from "react";
import { TheInput } from "./TheInput";
import { TheSelect } from "./TheSelect";
import { TheFileInput } from "./TheFileInput ";
import { TheFetchSelect } from './TheFetchSelect';
import { FormOptions, SetInput } from "./types";
import { Loading } from './../Loading';
import { TheTextarea } from './TheTextArea';
import { TheSearchSelect } from './TheSearchSelect';
import { TheCountrySelect } from './TheCountrySelect';

type FormError = { name: string; message: string };


type Props = {
  form_title: string;
  button_title?:string
  validate: (input: any) => boolean;
  submitFn: (input: any) => Promise<any>
  fields: FormOptions[]
  is_submitting?:boolean
  extra?: ReactElement<HTMLElement>
  error?:FormError
  editing?:boolean
  data?: any[]
};

type State = {
  value: string;
  input: any;
  error: FormError;
};

class TheForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  const state_input = {}
  this.props.fields.forEach((item=>{
    //@ts-expect-error
   state_input[item.field_name]=item.default_value
  
  }))
    this.state = {
      value: "",
      input: state_input,
      error: { name:this.props.error?.name as string, message:this.props.error?.message as string},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.setError = this.setError.bind(this);
    this.setFileInput = this.setFileInput.bind(this);
    this.setInput = this.setInput.bind(this);
  }
  componentDidUpdate(prevProps:Props, prevState:State) {
    if (prevProps.error !== this.props.error) {
      // @ts-expect-error
     this.setState({error:this.props?.error})
    }
  }
  setError(error: FormError) {
    this.setState({ error: error });
  }
  setFileInput(file:string,file_key:string,input:{}) {
    // @ts-expect-error
    input[file_key] = file
    this.setState({ input:input});
  }
  setInput({item,item_key}:SetInput) {
    const newinput = this.state.input
    newinput[item_key]=item
    this.setState({ input:newinput });
  }

  isValid() {
    return this.props.validate({
      input: this.state.input,
      setError: this.setError,
    });
  }
  async handleChange(event: React.ChangeEvent<any>) {

    const { value } = event.target;
    this.setState({
      input: { ...this.state.input, [event.target.id]: value },
    });
    if (event.target.files) {
     this.setState({
        input: { ...this.state.input, [event.target.id]: event.target.files[0] }
      })
    }
    // this.setError({name:"",message:""})
  }

  async handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
 

    if (!this.isValid()) {
      console.log("the error ", this.state.error);
    }
    else {
      try {
        this.setError({ name: "", message: "" });
        const formData = new FormData();
        this.props.fields.map((item)=>{
          // console.log("item added to fromdata ",item.field_name, this.state.input[item.field_name])
          formData.append(item.field_name, this.state.input[item.field_name])
       })
        const result = await this.props.submitFn(formData);
        // console.log("save result === ", result);
        // console.log("A name was submitted: ", this.state.input);
      } catch (err: any) {
        // console.log("error adding item", err.message);
        this.setError({ name: "main", message: err.message });
      }

    }
  }

  render() {

  // console.log("this.props.error === ",this.props.error)
  //   console.log("this.state.error === ", this.state.error)
    return (
      <div className="w-full h-full flex flex-col items-center 
            border border-slate-900 dark:border-slate-300 shadow-sm shadow-slate-600
           overflow-y-scroll scroll-bar m-1 p-1">
        <form
          className=" min-h-fit  m-1 p-1 w-full text-base 
          font-normal flex flex-col items-center justify-center 
          rounded-md "
          onSubmit={this.handleSubmit} >
          <div className="text-2xl font-bold p-1 m-1 w-full 
          flex items-center justify-center ">
            {this.props.form_title}</div>
          {
            this.props.fields && this.props.fields.map((item, index) => {
          //  console.log("item input  == ",item)
            if(item.field_type === "select"){
              return (
                <TheSelect
                  key={index + item.field_name}
                  error={this.state.error}
                  handleChange={this.handleChange}
                  item={item}
                  input={this.state.input}
                />)
            }

           if(item.field_type === "file"){
                return (
                  <TheFileInput
                    key={index + item.field_name}
                    error={this.state.error}
                    handleChange={this.handleChange}
                    input={this.state.input}
                    item={item}
                  />)
               }
              if (item.field_type === "fetchselect") {
                return (
                  <TheFetchSelect
                    key={index + item.field_name}
                    form_options={item}
                    setInput={this.setInput}
                    // head={{collection:item.misc?.coll_name as string,prop:item.field_name+"."+item.filter_key}}
                  />)
              }
              if (item.field_type === "countryselect") {
                return (
                  <TheCountrySelect
                    key={index + item.field_name}
                    form_options={item}
                    setInput={this.setInput}
                  // head={{collection:item.misc?.coll_name as string,prop:item.field_name+"."+item.filter_key}}
                  />)
              }
              if (item.field_type === "searchselect") {
                return (
                  <TheSearchSelect
                    key={index + item.field_name}
                    form_options={item}
                    setInput={this.setInput}
                  
                  />)
              }
              if (item.field_type === "textarea") {
                return (
                  <TheTextarea
                    key={index + item.field_name}
                    error={this.state.error}
                    handleChange={this.handleChange}
                    input={this.state.input}
                    form_options={item}
                  />)
              }

 
              return (
              <TheInput
                key={index + item.field_name}
                error={this.state.error}
                handleChange={this.handleChange}
                input={this.state.input}
                form_options={item}
                 />)
              
            })
          }
          {
            this.state.error.name === "main" && this.state.error.message !== "" ?
              <div className="text-red-300 border border-red-500 p-2 m-1 w-[80%]
              break-words  text-[14px] rounded-sm
            ">{this.state.error.message}</div> : null
          }
     
          <div className="w-full p-1 flex items-center justify-center">
           {
           this.props.editing?<button className="p-2 w-[70%] md:w-[50%]
            border-2 dark:border border-slate-700 dark:border-slate-400 dark:bg-slate-800
            flex items-center justify-center m-2 rounded-lg 
            hover:shadow-slate-900 dark:hover:shadow-slate-50 
            hover:shadow-lg dark:hover:shadow
            hover:scale-105">
              {this.props.is_submitting?
              <div className="h-full w-[60%] flex justify-center items-center">
                <Loading size={40}/></div>:
              <div className="text-lg font-bold dark:font-normal ">{this.props.button_title??"submit"}
              </div>
            }
          </button>:null
          }
         </div>
        </form>
      </div>
    );
  }
}

export default TheForm;
