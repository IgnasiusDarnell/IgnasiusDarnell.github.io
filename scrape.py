from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Setup WebDriver (gunakan ChromeDriver)
driver = webdriver.Chrome()

try:
    # Buka Google Maps
    driver.get("https://www.google.com/maps/place/Bengkel+Mobil+Teguh+Ngadirejo/@-7.237391,110.056639,16z")
    time.sleep(5)

    # Scroll ke bagian ulasan
    review_section = driver.find_element(By.XPATH, '//*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]')
    driver.execute_script("arguments[0].scrollIntoView(true);", review_section)
    time.sleep(3)

    # Klik tombol "Lihat semua ulasan"
    see_all_reviews_button = driver.find_element(By.XPATH, '//*[@id="pane"]/div/div[1]/div/div/div[2]/div[1]/div[1]/div[2]/div/div[1]/span[1]/span/span[1]/span[2]/span[1]/button')
    see_all_reviews_button.click()
    time.sleep(5)

    # Ambil ulasan
    reviews = driver.find_elements(By.XPATH, '//*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div[9]/div')
    high_rated_reviews = []

    for review in reviews:
        try:
            name = review.find_element(By.XPATH, './/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]').text
            rating = review.find_element(By.XPATH, './/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/span[1]/span[1]').get_attribute("aria-label")
            comment = review.find_element(By.XPATH, './/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]').text

            if int(rating.split()[0]) > 4:
                high_rated_reviews.append({
                    "name": name,
                    "rating": rating,
                    "comment": comment
                })
        except Exception as e:
            print(f"Error parsing review: {e}")

    # Cetak hasil
    for review in high_rated_reviews:
        print(f"Nama: {review['name']}")
        print(f"Rating: {review['rating']}")
        print(f"Komentar: {review['comment']}")
        print("-" * 50)

finally:
    driver.quit()