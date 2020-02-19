# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

items = Item.create(
  [
    {name: 'Undergarments', cost: 10, image: '/images/outfits/underwear_grey.png'},
    {name: 'Wizard Robe', cost: 800, image: '/images/outfits/robe_green.png' },
    {name: 'Casual Outfit', cost: 150, image: '/images/outfits/casual_pink.png' },
    {name: 'Hitchhiker Boots', cost: 230, image: '/images/outfits/hitchhiker.png'},
    {name: 'Modern Vampire', cost: 500, image: '/images/outfits/vamp_purple.png'},
    {name: 'Hollywood Dress', cost: 1000, image: '/images/outfits/dress_red.png'},
    {name: 'Beatrix Kiddo', cost: 940, image: '/images/outfits/kill_bill.png'},
    {name: 'Pippy Longstocking', cost: 860, image: '/images/hairstyles/pippy_red.png'},
    {name: 'Buzzcut', cost: 50, image: '/images/hairstyles/buzz_yellow.png'},
    {name: 'Low Bun', cost: 350, image: '/images/hairstyles/bun_green.png'},
    {name: 'Retro Wig', cost: 270, image: '/images/hairstyles/flip_pink.png'},
    {name: 'Ocean Waves', cost: 700, image: '/images/hairstyles/wavy_blue.png'},
    {name: 'Orange Shag', cost: 90, image: '/images/hairstyles/shag_orange.png'},
    {name: 'Ponytail', cost: 190, image: '/images/hairstyles/pony_brown.png'},
    {name: 'Cowboy Hat', cost: 420, image: '/images/hairstyles/cowboy_hat.png'},
    {name: 'Light Skin', cost: 30, image: '/images/bases/base_light.png'},
    {name: 'Dark Skin', cost: 30, image: '/images/bases/base_dark.png'},
    {name: 'Alien', cost: 550, image: '/images/bases/base_alien.png'},
    {name: 'Undine', cost: 680, image: '/images/bases/base_undine.png'},
    {name: 'Drow', cost: 300, image: '/images/bases/base_grey.png'}
  ]
)

