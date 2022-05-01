import csv
import json

def main():
    symbols = {}
    files = ['nasdaq_screener_1650201733680.csv', 'nasdaq_screener_1650201753731.csv']

    for file in files:
        with open(file) as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                symbol = row['Symbol']
                name = row['Name']
                symbols[symbol] = name
    
    with open('stocks.json', 'w') as f:
        json.dump(symbols, f)

if __name__ == '__main__':
    main()