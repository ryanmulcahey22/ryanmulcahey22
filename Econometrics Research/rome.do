import delimited "\\apporto.com\dfs\WUSTL\Users\1353627241_wustl\Desktop\romeListings.csv"
drop if price>500
drop if number_of_reviews_ltm>20
drop if availability_365<7
drop if number_of_reviews<3
drop if minimum_nights>9

//generate DISTmonti = sqrt((latitude-41.8947)*(latitude-41.8947)+(longitude-12.4925)*(longitude-12.4925))
//generate DISTpanth = sqrt((latitude-41.8986)*(latitude-41.8986)+(longitude-12.4769)*(longitude-12.4769))
//generate dummyCLSM = ENTIRE*DISTclsm
//generate dummySTPTR = ENTIRE*DISTstptr

generate DISTstptr = sqrt((latitude-41.9022)*(latitude-41.9022)+(longitude-12.4539)*(longitude-12.4539))
generate DISTclsm = sqrt((latitude-41.8902)*(latitude-41.8902)+(longitude-12.4922)*(longitude-12.4922))
generate PERCENT = number_of_reviews_ltm/number_of_reviews

tabulate room_type
generate ENTIRE = 0
replace ENTIRE = 1 if room_type=="Entire home/apt"
//generate PRIV = 0
//replace PRIV = 1 if room_type=="Private room"
//generate SHARED = 0
//replace SHARED = 1 if room_type=="Shared room"

generate MINNIGHTS=minimum_nights
generate REVIEWSRATE = reviews_per_month
generate HOSTLISTINGS = calculated_host_listings_count
generate AVAILABILITY = availability_365

generate lnprice = ln(price)

reg lnprice DISTclsm DISTstptr MINNIGHTS PERCENT REVIEWSRATE HOSTLISTINGS AVAILABILITY ENTIRE, robust
//robust:  reg Y X, robust     OLS+HC standard errors
//make chart of lat and long with different colors for different predicted prices

predict resid_price, residuals
scatter resid_price lnprice


correlate lnprice DISTclsm DISTstptr MINNIGHTS PERCENT REVIEWSRATE HOSTLISTINGS AVAILABILITY ENTIRE 

vif

//estat hettest
//estat imtest, white
estat ovtest
//su lnprice DISTclsm DISTstptr MINNIGHTS PERCENT REVIEWSRATE HOSTLISTINGS AVAILABILITY ENTIRE 
