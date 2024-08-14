#Extracting required libraries
import numpy as np
import pandas as pd
import warnings
warnings.filterwarnings('ignore')

# filename = r'D:\7. P&G\Rakesh\Task - 1\P&G Global Hackathin_Mockup_v5_1.xlsx'
# data = pd.read_excel(filename)

def show_details(input_start_date,input_end_date,input_state,input_city,input_product, filepath):

    '''
    DOCSTRING
    input - start_date,end_date,state,city,product name
    output - list of dictionaries of all rows
    '''

    data = pd.read_excel(filepath)

    # Creating a input dictionary
    input_dict = {'input_start_date':input_start_date,'input_end_date':input_end_date,
              'State':input_state,'City':input_city,'Product':input_product}

    # the following code checks for an empty input and updates it accordingly
    for index,value in input_dict.items():
        if(index != 'input_start_date' and index != 'input_end_date'):
            if(len(value) == 0):
                input_dict[index] = list(data[index].unique())
                continue
            else:
                input_dict[index] = value.split()
                continue
        else:
            if(len(value) == 0 and index == 'input_start_date'):
                input_dict[index] = data.Date.min()
                continue
            elif(len(value) == 0 and index == 'input_end_date'):
                input_dict[index] = data.Date.max()
                continue
            else:
                input_dict[index] = value
                continue


    # Creating Date filter
    date_filter = (data['Date'] >= input_dict['input_start_date']) & (data['Date'] <= input_dict['input_end_date'])

    # Date, State,City and Product filter
    filter_Data = data[(date_filter) &
                       (data.State.isin(input_dict['State'])) &
                       (data.City.isin(input_dict['City'])) &
                       (data.Product.isin(input_dict['Product']))]

    filter_Data = filter_Data.reset_index(drop=True)


    # Creating an output dictionary to store all the required outputs
    master_dict = {}


    # Converting to json and appending to a list and adding the required values to the output dictionary
    filter_Data['Date'] = filter_Data.Date.astype(str)
    master_dict['Data'] = filter_Data.to_dict(orient='records')


    #  adding the required values to the output dictionary
    master_dict['totalTransaction'] = sum(filter_Data.Transaction)
    master_dict['totalRevenue'] = sum(filter_Data.Revenue)
    master_dict['totalUnitsSold'] = sum(filter_Data['Units Sold'])
    master_dict['totalAvgCustomerSpend'] = np.mean(filter_Data['Av Customer Spend'])

    filter_Data['Share Percent'] = round((filter_Data['Units Sold'] / sum(filter_Data['Units Sold']))*100,2)


    # Extracting the top4 values by UnitsSold, Customers, Transaction, Revenue and AvgCustomerSpends
    topFour_ByUnitsSold = filter_Data[['Product','Units Sold','Share Percent']].sort_values(by = 'Units Sold',ascending = False).reset_index(drop=True).head(4)
    topFour_ByCustomers = filter_Data[['Product','Customers','Share Percent']].sort_values(by = 'Customers',ascending = False).reset_index(drop=True).head(4)
    topFour_ByTransaction = filter_Data[['Product','Transaction','Share Percent']].sort_values(by = 'Transaction',ascending = False).reset_index(drop=True).head(4)
    topFour_ByRevenue = filter_Data[['Product','Revenue','Share Percent']].sort_values(by = 'Revenue',ascending = False).reset_index(drop=True).head(4)
    topFour_ByAvgCusSpends = filter_Data[['Product','Av Customer Spend','Share Percent']].sort_values(by = 'Av Customer Spend',ascending = False).reset_index(drop=True).head(4)

    bottomFour_ByUnitsSold = filter_Data[['Product','Units Sold','Share Percent']].sort_values(by = 'Units Sold',ascending = False).reset_index(drop=True).tail(4)
    bottomFour_ByRevenue = filter_Data[['Product','Revenue','Share Percent']].sort_values(by = 'Revenue',ascending = False).reset_index(drop=True).tail(4)


    # Converting to json and appending to a list and adding the required values to the output dictionary
    master_dict["topFour_ByUnitsSold"]     = topFour_ByUnitsSold.to_dict(orient='records')
    master_dict["topFour_ByCustomers"]     = topFour_ByCustomers.to_dict(orient='records')
    master_dict["topFour_ByTransaction"]   = topFour_ByTransaction.to_dict(orient='records')
    master_dict["topFour_ByRevenue"]       = topFour_ByRevenue.to_dict(orient='records')
    master_dict["topFour_ByAvgCusSpends"]  = topFour_ByAvgCusSpends.to_dict(orient='records')

    master_dict["bottomFour_ByUnitsSold"]  = bottomFour_ByUnitsSold.to_dict(orient='records')
    master_dict["bottomFour_ByRevenue"]  = bottomFour_ByRevenue.to_dict(orient='records')

    return master_dict

print(show_details('2020-05-01','2020-05-10','Karnataka','Bangalore','Ambi Pur', r'PG_Global_Hackathon_Mockup_v5_1.xlsx'))
