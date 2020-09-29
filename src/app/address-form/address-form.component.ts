import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SpellCheckerService } from 'ngx-spellchecker';
import { Observable, timer } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SpellchekerService } from '../spellcheker.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit, AfterViewInit {

  hasUnitNumber = false;
  display = 'flex';
  dm = 'margin';
  show: boolean = true;
  like: boolean = false;
  likesColor: string = 'primary';
  likeEmojiPath = 'assets/image/login.png';
  public daglo: boolean = false;
  @ViewChild('imgdiv') imgdiv: ElementRef;
  spellcheckhint: any;

  fileURL = "https://raw.githubusercontent.com/JacobSamro/ngx-spellchecker/master/dict/normalized_en-US.dic";

  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  });

  states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'American Samoa', abbreviation: 'AS' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'District Of Columbia', abbreviation: 'DC' },
    { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Guam', abbreviation: 'GU' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Marshall Islands', abbreviation: 'MH' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Northern Mariana Islands', abbreviation: 'MP' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Palau', abbreviation: 'PW' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Puerto Rico', abbreviation: 'PR' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virgin Islands', abbreviation: 'VI' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  


  constructor(private fb: FormBuilder, private breakpointObserver: BreakpointObserver, private spellcheck: SpellchekerService,private httpClient:HttpClient,private spellCheckerService: SpellCheckerService) {}
  ngAfterViewInit(): void {
    this.imgdiv.nativeElement.style.display = 'none'
  }

  ngOnInit(): void {
    this.spellcheck.suggestionValue.subscribe(res=>{
      this.spellcheckhint= res;
    });

  }

  checkSpell(){
    const val = this.addressForm.value;

    
    if(typeof val.company!='undefined' && val.company){
      this.checkPlease(val.company);
    }else{
      this.spellcheckhint="";
    }
    
  }

  public checkPlease(wordTocheck:string):any{
    this.httpClient.get(this.fileURL, { responseType: 'text' }).subscribe((res: any) => {
      let dictionary = this.spellCheckerService.getDictionary(res)
      if(!dictionary.spellCheck(wordTocheck)){
        console.log(dictionary.getSuggestions(wordTocheck,null,null));
        this.spellcheckhint= dictionary.getSuggestions(wordTocheck,null,null);
      }
    });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      alert('Like this app to see the amazing thing');
      this.show = false;
    }
  }

  public toggleLike() {
    this.like = !this.like;
    this.showImages(this.like);
    this.likesColor = this.like ? 'warn' : 'primary';
  }

  public showImages(like: boolean) {
    this.likeEmojiPath = like ? 'assets/image/login.png' : 'assets/image/cry.gif';
    this.imgdiv.nativeElement.style.display = 'block';
    timer(900).subscribe(res => {
      this.imgdiv.nativeElement.style.display = 'none'
    });
  }
}
