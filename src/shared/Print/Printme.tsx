import React from 'react'
import { TheTable } from '../table';




type MyProps = {
  // using `interface` is also ok
title:string  
ref: React.MutableRefObject<null>
header:{name:string,prop:string,type:string,editable:boolean}[],
rows:any[]
};
type MyState = {
  title:string
  header:{name:string,prop:string,type:string,editable:boolean}[],
  rows:any[]
}

export class PrintThis extends React.Component<MyProps, MyState> {
    constructor(props:any){
        super(props);
        this.state={
            header:this.props.header,
            rows:this.props.rows,
            title:this.props.title
        }

    }

    render() {

      return (
        <div className='m-5 '>
         <div  className="capitaliza text-[15px]  m-1">{this.state.title}</div> 
        <TheTable
         rows={this.state.rows}
         header={this.state.header}
        />
      </div>
      );
    }
  }
