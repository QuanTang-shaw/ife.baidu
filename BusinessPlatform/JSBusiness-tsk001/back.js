/*    if(drawing1.getContext){
         var context1=drawing1.getContext("2d");
         // var gradient1=context1.createRadialGradient(100,100,80,100,140,120);
         var gradient1=context1.createLinearGradient(200,200,80,80);
         gradient1.addColorStop(0,"blue");
         gradient1.addColorStop(1,"black");
         context1.fillStyle=gradient1;
         // context1.fillRect(20,20,250,250);
         console.log(gradient1);

         context1.beginPath();
         context1.rect(200,200,100,100);
         context1.fill();
         context1.stroke();
         context1.closePath();

      }
*/

RGB------》HSL 代码
 
var_R = ( R / 255 )                     //RGB from 0 to 255
var_G = ( G / 255 )
var_B = ( B / 255 )
var_Min = min( var_R, var_G, var_B )    //Min. value of RGB
var_Max = max( var_R, var_G, var_B )    //Max. value of RGB
del_Max = var_Max - var_Min             //Delta RGB value

L = ( var_Max + var_Min ) / 2

if ( del_Max == 0 )                     //This is a gray, no chroma...
{
   H = 0                                //HSL results from 0 to 1
   S = 0
}
else                                    //Chromatic data...
{
   if ( L < 0.5 ) S = del_Max / ( var_Max + var_Min )
   else           S = del_Max / ( 2 - var_Max - var_Min )

   del_R = ( ( ( var_Max - var_R ) / 6 ) + ( del_Max / 2 ) ) / del_Max
   del_G = ( ( ( var_Max - var_G ) / 6 ) + ( del_Max / 2 ) ) / del_Max
   del_B = ( ( ( var_Max - var_B ) / 6 ) + ( del_Max / 2 ) ) / del_Max

   if      ( var_R == var_Max ) H = del_B - del_G
   else if ( var_G == var_Max ) H = ( 1 / 3 ) + del_R - del_B
   else if ( var_B == var_Max ) H = ( 2 / 3 ) + del_G - del_R

   if ( H < 0 ) ; H += 1
   if ( H > 1 ) ; H -= 1
}

 

 

HSL-----》RGB 代码
 
 
if ( S == 0 )                       //HSL from 0 to 1
{
   R = L * 255                      //RGB results from 0 to 255
   G = L * 255
   B = L * 255
}
else
{
   if ( L < 0.5 ) var_2 = L * ( 1 + S )
   else           var_2 = ( L + S ) - ( S * L )
   var_1 = 2 * L - var_2

   R = 255 * Hue_2_RGB( var_1, var_2, H + ( 1 / 3 ) ) 
   G = 255 * Hue_2_RGB( var_1, var_2, H )
   B = 255 * Hue_2_RGB( var_1, var_2, H - ( 1 / 3 ) )
} 

--------------------------------------------------------------------------------

Hue_2_RGB( v1, v2, vH )             //Function Hue_2_RGB
{
   if ( vH < 0 ) vH += 1
   if ( vH > 1 ) vH -= 1
   if ( ( 6 * vH ) < 1 ) return ( v1 + ( v2 - v1 ) * 6 * vH )
   if ( ( 2 * vH ) < 1 ) return ( v2 )
   if ( ( 3 * vH ) < 2 ) return ( v1 + ( v2 - v1 ) * ( ( 2 / 3 ) - vH ) * 6 )
   return ( v1 )
}