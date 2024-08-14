# -*- coding: utf-8 -*-
"""
Created on Wed May 13 13:16:05 2020

@author: astha
"""

def csv_to_dictionary(path_to_csv,cols = None):
    '''
    path_to_csv : path to the csv file
    cols : list of columns whose information needs to be added to dictionary.
           If no list is passed, all the columns' information will be added to dictionary
    '''
    import pandas as pd
    data = pd.read_csv(path_to_csv)
    dictionary = {}
    if cols is None:
        cols = data.columns.values
    for c in cols:
        data[c].fillna("-", inplace = True)
        dictionary[c] = data[c].tolist()
    return dictionary


# print(csv_to_dictionary('Combined.csv'))
#print(csv_to_dictionary('Combined.csv',['Time Stamp','Frozen Food']))# example passing of list of columns
