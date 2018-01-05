page 50141 "Demo Page"
{
    PageType = Card;
    
    layout
    {
        area(Content)
        {
            field(Name; Name) {
                CaptionML = ENU='Name';

                trigger OnValidate();
                begin
                    UpdateName();
                end;
            }

            usercontrol(Demo; DemoControl)
            {
                ApplicationArea = All;
            
            }
        }
    }
    
    var
        Name: Text;
        
    local procedure UpdateName();
    begin
        CurrPage.Demo.SetName(Name);
    end;

    trigger OnInit();
    begin
        Name := 'waldo';
    end;

    trigger OnOpenPage();
    begin
        UpdateName();
    end;
}