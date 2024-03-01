import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
 // title = 'ReactiveFormDemo';
  constructor(private fb:FormBuilder){}


registrationForm:any;
ngOnInit(){
  this.registrationForm=this.fb.group({
    userName:['',[Validators.required,Validators.minLength(2)]],
    password:['',Validators.required],
    confirmPassword:[''],
    email:[''],
    subscribe:[false],
    address:this.fb.group({
      city:[''],
      state:[''],
      postalCode:['']
    }),
    alternateEmail:this.fb.array([])
    //,{validator:PasswordValidator}
  });


  // conditionally applied validation on email
  this.registrationForm.get('subscribe').valueChanges.subscribe((checkedValue:any)=>{
    const email=this.registrationForm.get('email');
    if(checkedValue){
      email.setValidators(Validators.required)
    }
    else
    {
      email.clearValidators();
    }
    // to reflect changes in model
    email.updateValueAndValidity();
  })
}






get userName()
{
  return this.registrationForm.get('userName');
}


get email()
{
  return this.registrationForm.get('email');
}
get password()
{
  return this.registrationForm.get('password');
}
// code to adding controls dynamically
get alternateEmail()
{
  return this.registrationForm.get('alternateEmail') as FormArray;
}


addAlternateEmail()
{
  this.alternateEmail.push(this.fb.control(['']));
}
// using FormGroup and FormControl Class
  // registrationForm=new FormGroup({
  //   userName:new FormControl(''),
  //   password:new FormControl(''),
  //   confirmPassword:new FormControl(''),
  //   address:new FormGroup({
  //     city:new FormControl(''),
  //     state:new FormControl(''),
  //     postalCode:new FormControl(''),
  //   })
  // });


  loadData()
  {
    // setValue needs all values of form control
    // this.registrationForm.setValue({
    //   userName:"Aniket",
    //   password:'123',
    //   confirmPassword:'123',
    //   email:'',
    //   subscribe:false,
    //   alternateEmail:'',
    //   address:{
    //     city:'Aurangabad',
    //     state:'MH',
    //     postalCode:123456
    //   }
    // });
    // This can update partial update in form control
        this.registrationForm.patchValue({
      userName:"Aniket",
      password:'123',
      confirmPassword:'123',
    });
  }


  // submit form data
  onSubmit()
  {
    console.log(this.registrationForm.value);
  }

}
